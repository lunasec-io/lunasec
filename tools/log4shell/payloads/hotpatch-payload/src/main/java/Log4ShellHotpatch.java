// Adapted from: https://github.com/Cybereason/Logout4Shell/blob/main/src/main/java/Log4jRCE.java
import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.config.Configuration;
import org.apache.logging.log4j.core.lookup.Interpolator;
import org.apache.logging.log4j.core.lookup.StrLookup;
import org.apache.logging.log4j.core.selector.ContextSelector;

import javax.naming.Context;
import javax.naming.Name;
import javax.naming.spi.ObjectFactory;
import java.lang.reflect.*;
import java.util.Hashtable;
import java.util.Map;


public class Log4ShellHotpatch implements ObjectFactory {
    private static final String tag = "Log4Shell Hotpatch";

    static void log(String msg) {
        System.out.println("[" + tag + "] " + msg);
    }

    static void error(String msg) {
        System.err.println("[" + tag + "] " + msg);
    }

    @Override
    public Object getObjectInstance(Object obj, Name name, Context nameCtx, Hashtable<?, ?> environment) {
        log("Attempting to apply Log4Shell hotpatch to service...");
        try {
            // Try for versions of Log4j >= 2.10
//            boolean success = attemptLog4J210Patch();
//            if (success) {
//                return "Successfully hotpatched Log4Shell vulnerability.";
//            }

            // reconfiguring log4j
            boolean success = removeJndiFromLog4jContextLookup();
            if (success) {
                return "Successfully hotpatched Log4Shell vulnerability.";
            }
        } catch (Exception e) {
            error(e.toString());
            e.printStackTrace();
        }
        return "Unable to hotpatch Log4Shell vulnerability.";
    }

    static boolean attemptLog4J210Patch() throws Exception {
        try {
            ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
            Class<?> c = classLoader.loadClass("org.apache.logging.log4j.core.util.Constants");
            Class<?> configuratorClass = classLoader.loadClass("org.apache.logging.log4j.core.config.Configurator");

            Field field = c.getField("FORMAT_MESSAGES_PATTERN_DISABLE_LOOKUPS");
            log("Setting " + field.getName() + " value to True");
            setFinalStatic(field, Boolean.TRUE);

            log("attempting to reconfigure log4j with updated configuration.");
            Method reconfigure = configuratorClass.getMethod("reconfigure");
            reconfigure.invoke(null);

            log("Successfully patched.");
            return true;
        } catch (NoSuchFieldException e) {
            // Fall back to older versions. Try to make JNDI non instantiable
            error("No field FORMAT_MESSAGES_PATTERN_DISABLE_LOOKUPS - version <= 2.9.0");
        }
        return false;
    }

    static void patchLoggerContexts(ContextSelector ctxSelector) throws NoSuchFieldException, IllegalAccessException {
        log(ctxSelector.getLoggerContexts().toString());
        for (LoggerContext ctx: ctxSelector.getLoggerContexts()) {
            log("attempting to reconfigure LoggerContext.");
            //ctx.reconfigure();
            Configuration config = ctx.getConfiguration();
            StrLookup resolver = config.getStrSubstitutor().getVariableResolver();
            if (resolver instanceof Interpolator) {
                log("Lookup is an Interpolator - attempting to remove JNDI");
                Field lookups = null;
                try {
                    lookups = Interpolator.class.getDeclaredField("lookups");
                } catch (NoSuchFieldException e) {
                    lookups = Interpolator.class.getDeclaredField("strLookupMap");
                }
                lookups.setAccessible(true);
                Map<String, StrLookup> lookupMap = (Map<String, StrLookup>) lookups.get(resolver);
                lookupMap.remove("jndi");
            }
        }
    }

    static boolean removeJndiFromLog4jContextLookup() throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, IllegalAccessException, NoSuchFieldException {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        Class<?> configuratorClass = classLoader.loadClass("org.apache.logging.log4j.core.config.Configurator");
        Class<?> log4jContextFactoryClass = classLoader.loadClass("org.apache.logging.log4j.core.impl.Log4jContextFactory");
        Method getFactoryMethod = configuratorClass.getDeclaredMethod("getFactory");
        getFactoryMethod.setAccessible(true);

        log("calling getFactoryMethod on Configurator");
        Object factory = getFactoryMethod.invoke(null);

        log("calling getSelector on Configurator factory");
        Method getSelector = log4jContextFactoryClass.getMethod("getSelector");
        Object contextSelector = getSelector.invoke(factory, null);

        log("patching logger contexts");
        ContextSelector ctxSelector = (ContextSelector) contextSelector;
        patchLoggerContexts(ctxSelector);
        return true;
    }

    static void setFinalStatic(Field field, Object newValue) throws Exception {
        setAccess(field);
        field.set(null, newValue);
    }

    private static void setAccess(Field field) throws NoSuchFieldException, IllegalAccessException {
        field.setAccessible(true);
        Field modifiersField = Field.class.getDeclaredField("modifiers");
        modifiersField.setAccessible(true);
        modifiersField.setInt(field, field.getModifiers() & ~Modifier.FINAL);
    }
}