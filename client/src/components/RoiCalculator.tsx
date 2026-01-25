import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";

function Counter({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  return (
    <span className="tabular-nums tracking-tight">
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}

export function RoiCalculator() {
  const [teamSize, setTeamSize] = useState([1]);
  const [hoursPerWeek, setHoursPerWeek] = useState([4]);
  const [hourlyRate, setHourlyRate] = useState([60]);

  const annualCost = teamSize[0] * hoursPerWeek[0] * 52 * hourlyRate[0];
  const hoursWasted = teamSize[0] * hoursPerWeek[0] * 52;

  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: The Pitch */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-primary tracking-widest mb-4"
            >
              [003] THE HIDDEN COST
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl leading-tight mb-6"
            >
              DO THE MATH.<br />
              <span className="text-background/50">IT'S EXPENSIVE TO BE MANUAL.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-mono text-sm text-background/70 leading-relaxed max-w-md"
            >
              Small interruptions compound into massive losses. See how much "just copy-pasting" is actually costing your organization every year.
            </motion.p>
          </div>

          {/* Right: The Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="border border-background/20 bg-background/5 p-8 md:p-10"
          >
            {/* Inputs */}
            <div className="space-y-8 mb-10">
              {/* Team Size */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-background/50">
                    <Users className="h-4 w-4" /> Team Size
                  </label>
                  <span className="font-mono font-bold text-background">{teamSize} people</span>
                </div>
                <Slider
                  value={teamSize}
                  onValueChange={setTeamSize}
                  min={1}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>

              {/* Hours per Week */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-background/50">
                    <Clock className="h-4 w-4" /> Hours wasted / person / week
                  </label>
                  <span className="font-mono font-bold text-background">{hoursPerWeek} hours</span>
                </div>
                <Slider
                  value={hoursPerWeek}
                  onValueChange={setHoursPerWeek}
                  min={1}
                  max={20}
                  step={1}
                  className="cursor-pointer"
                />
              </div>

              {/* Hourly Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-background/50">
                    <DollarSign className="h-4 w-4" /> Avg. Hourly Cost
                  </label>
                  <span className="font-mono font-bold text-background">${hourlyRate}/hr</span>
                </div>
                <Slider
                  value={hourlyRate}
                  onValueChange={setHourlyRate}
                  min={20}
                  max={200}
                  step={5}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-background/20">
              <div>
                <div className="mono-label text-background/50 mb-2">ANNUAL WASTE</div>
                <div className="text-3xl md:text-4xl font-bold text-primary font-mono">
                  <Counter value={annualCost} prefix="$" />
                </div>
              </div>
              <div>
                <div className="mono-label text-background/50 mb-2">HOURS LOST</div>
                <div className="text-3xl md:text-4xl font-bold text-background font-mono">
                  <Counter value={hoursWasted} suffix="h" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
