// Adapted from: https://github.com/Cybereason/Logout4Shell/blob/main/src/main/java/Log4jRCE.java
import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.config.Configuration;
import org.apache.logging.log4j.core.lookup.Interpolator;
import org.apache.logging.log4j.core.lookup.StrLookup;
import org.apache.logging.log4j.core.selector.ContextSelector;

import java.lang.reflect.*;
import java.util.Map;


public class Log4ShellHotpatch {
    private static final String tag = "Log4Shell Hotpatch";

    static void log(String msg) {
        System.out.println("[" + tag + "] " + msg);
    }

    static void error(String msg) {
        System.err.println("[" + tag + "] " + msg);
    }

    static {
        try {
            // Try for versions of Log4j >= 2.10
            attemptLog4J210Patch();

            // reconfiguring log4j
            removeJndiFromLog4jContextLookup();
        } catch (Exception e) {
            error(e.toString());
            e.printStackTrace();
        }
    }

    static void attemptLog4J210Patch() throws Exception {
        try {
            Class<?> c = Thread.currentThread().getContextClassLoader().loadClass("org.apache.logging.log4j.core.util.Constants");
            Field field = c.getField("FORMAT_MESSAGES_PATTERN_DISABLE_LOOKUPS");
            log("Setting " + field.getName() + " value to True");
            setFinalStatic(field, Boolean.TRUE);
        } catch (NoSuchFieldException e) {
            // Fall back to older versions. Try to make JNDI non instantiable
            error("No field FORMAT_MESSAGES_PATTERN_DISABLE_LOOKUPS - version <= 2.9.0");
            error("Will attempt to modify the configuration directly");
        }
    }

    static void patchLoggerContexts(ContextSelector ctxSelector) throws NoSuchFieldException, IllegalAccessException {
        for (LoggerContext ctx: ctxSelector.getLoggerContexts()) {
            ctx.reconfigure();
            log("Reconfiguring context");
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

    static void removeJndiFromLog4jContextLookup() throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, IllegalAccessException, NoSuchFieldException {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        Class<?> configuratorClass = classLoader.loadClass("org.apache.logging.log4j.core.config.Configurator");
        try {
            Method reconfigure = configuratorClass.getMethod("reconfigure");
            reconfigure.invoke(null);
        } catch (Exception ex) {
            Method getFactoryMethod = configuratorClass.getDeclaredMethod("getFactory");
            getFactoryMethod.setAccessible(true);
            Object factory = getFactoryMethod.invoke(null);
            Class<?> log4jContextFactoryClass = classLoader.loadClass("org.apache.logging.log4j.core.impl.Log4jContextFactory");
            Method getSelector = log4jContextFactoryClass.getMethod("getSelector");
            Object contextSelector = getSelector.invoke(factory, null);
            ContextSelector ctxSelector = (ContextSelector) contextSelector;

            patchLoggerContexts(ctxSelector);
        }
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