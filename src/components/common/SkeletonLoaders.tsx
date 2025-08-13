import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function StoreCardSkeleton({ className }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden",
        className
      )}
    >
      <motion.div
        className="h-48 bg-muted"
        animate={{
          background: [
            "hsl(var(--muted))",
            "hsl(var(--muted) / 0.8)",
            "hsl(var(--muted))",
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <div className="p-4 space-y-3">
        <motion.div
          className="h-4 bg-muted rounded w-3/4"
          animate={{
            background: [
              "hsl(var(--muted))",
              "hsl(var(--muted) / 0.8)",
              "hsl(var(--muted))",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="h-3 bg-muted rounded w-1/2"
          animate={{
            background: [
              "hsl(var(--muted))",
              "hsl(var(--muted) / 0.8)",
              "hsl(var(--muted))",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
        <div className="flex justify-between items-center">
          <motion.div
            className="h-3 bg-muted rounded w-16"
            animate={{
              background: [
                "hsl(var(--muted))",
                "hsl(var(--muted) / 0.8)",
                "hsl(var(--muted))",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />
          <motion.div
            className="h-6 bg-muted rounded w-12"
            animate={{
              background: [
                "hsl(var(--muted))",
                "hsl(var(--muted) / 0.8)",
                "hsl(var(--muted))",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function MenuItemSkeleton({ className }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "flex gap-4 p-4 bg-white rounded-lg border border-gray-200",
        className
      )}
    >
      <motion.div
        className="w-20 h-20 bg-muted rounded-lg flex-shrink-0"
        animate={{
          background: [
            "hsl(var(--muted))",
            "hsl(var(--muted) / 0.8)",
            "hsl(var(--muted))",
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <div className="flex-1 space-y-2">
        <motion.div
          className="h-4 bg-muted rounded w-3/4"
          animate={{
            background: [
              "hsl(var(--muted))",
              "hsl(var(--muted) / 0.8)",
              "hsl(var(--muted))",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="h-3 bg-muted rounded w-full"
          animate={{
            background: [
              "hsl(var(--muted))",
              "hsl(var(--muted) / 0.8)",
              "hsl(var(--muted))",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
        <motion.div
          className="h-4 bg-muted rounded w-16"
          animate={{
            background: [
              "hsl(var(--muted))",
              "hsl(var(--muted) / 0.8)",
              "hsl(var(--muted))",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
      </div>
    </motion.div>
  );
}

export function OrderTrackingSkeleton({ className }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-6",
        className
      )}
    >
      <div className="space-y-6">
        {[1, 2, 3, 4].map((step, index) => (
          <div key={step} className="flex items-center gap-4">
            <motion.div
              className="w-8 h-8 rounded-full bg-muted flex-shrink-0"
              animate={{
                background:
                  index < 2
                    ? [
                        "hsl(var(--primary))",
                        "hsl(var(--primary) / 0.8)",
                        "hsl(var(--primary))",
                      ]
                    : [
                        "hsl(var(--muted))",
                        "hsl(var(--muted) / 0.8)",
                        "hsl(var(--muted))",
                      ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
            <div className="flex-1 space-y-2">
              <motion.div
                className="h-3 bg-muted rounded w-32"
                animate={{
                  background: [
                    "hsl(var(--muted))",
                    "hsl(var(--muted) / 0.8)",
                    "hsl(var(--muted))",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              />
              <motion.div
                className="h-2 bg-muted rounded w-24"
                animate={{
                  background: [
                    "hsl(var(--muted))",
                    "hsl(var(--muted) / 0.8)",
                    "hsl(var(--muted))",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.1 + 0.2,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function HeroSkeleton({ className }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("w-full h-[80vh] bg-muted rounded-lg", className)}
    >
      <motion.div
        className="w-full h-full bg-gradient-to-br from-muted to-muted/80"
        animate={{
          background: [
            "linear-gradient(135deg, hsl(var(--muted)), hsl(var(--muted) / 0.8))",
            "linear-gradient(135deg, hsl(var(--muted) / 0.8), hsl(var(--muted)))",
            "linear-gradient(135deg, hsl(var(--muted)), hsl(var(--muted) / 0.8))",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
