package lunasec;

import java.lang.instrument.Instrumentation;

class Agent {
    public static void premain(String agentArgs, Instrumentation inst) {
        System.out.println("LOADED AGENT!!!!!!!!!!!!!!!!");
//        LOGGER.info("[Agent] In premain method");
//        String className = "com.baeldung.instrumentation.application.MyAtm";
//        transformClass(className,inst);
    }

    public static void agentmain(String agentArgs, Instrumentation inst) {
        System.out.println("LOADED AGENT at runtime!!!!!!!!!!!!!!!!");

//        LOGGER.info("[Agent] In agentmain method");
//        String className="com.baeldung.instrumentation.application.MyAtm";
//        transformClass(className,inst);
    }
}
