"use client";
import { motion } from 'framer-motion';

const LoadingComponent = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div className={"flex items-center justify-center w-full h-full gap-5"}>
        <motion.div className="w-8 h-8 noise neumorphism rounded-full" animate={{y: [0, -20, 0, 0]}}
                    transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}/>
        <motion.div className="w-8 h-8 noise neumorphism rounded-full" animate={{y: [0, -20, 0, 0]}}
                    transition={{delay: .4, duration: 2, repeat: Infinity, ease: 'easeInOut'}}/>
        <motion.div className="w-8 h-8 noise neumorphism rounded-full" animate={{y: [0, -20, 0, 0]}}
                    transition={{delay: .8, duration: 2, repeat: Infinity, ease: 'easeInOut'}}/>
        <motion.div className="w-8 h-8 noise neumorphism rounded-full" animate={{y: [0, -20, 0, 0]}}
                    transition={{delay: 1.2, duration: 2, repeat: Infinity, ease: 'easeInOut'}}/>
      </div>
    </div>
  );
};

export default LoadingComponent;