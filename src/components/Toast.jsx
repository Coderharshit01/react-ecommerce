import { X,Check } from "lucide-react";
import { motion } from "framer-motion";
function Toast({t}) {

    return ( 
       <>
 < motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
            >
              <Check size={24} />
              <span>{t.message}</span>
            </motion.div>
        </>
     );
}

export default Toast;