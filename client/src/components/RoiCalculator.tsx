import { useState, useEffect } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { DollarSign, Users, Clock, TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";

function Counter({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  return (
    <span className="tabular-nums tracking-tight">
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}

export function RoiCalculator() {
  const [teamSize, setTeamSize] = useState([10]);
  const [hoursPerWeek, setHoursPerWeek] = useState([5]);
  const [hourlyRate, setHourlyRate] = useState([60]);

  const annualCost = teamSize[0] * hoursPerWeek[0] * 52 * hourlyRate[0];
  const hoursWasted = teamSize[0] * hoursPerWeek[0] * 52;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: The Pitch */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-medium text-red-400">
              <TrendingUp className="h-3 w-3" />
              <span>The hidden cost of glue work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Do the math.<br />
              <span className="text-muted-foreground">It's expensive to be manual.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Small interruptions compound into massive losses. See how much "just copy-pasting" is actually costing your organization every year.
            </p>
          </div>

          {/* Right: The Calculator Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-600/30 rounded-2xl blur-lg opacity-50" />
            <div className="relative rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-8 shadow-2xl">
              
              {/* Inputs */}
              <div className="space-y-8 mb-12">
                {/* Team Size */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Users className="h-4 w-4" /> Team Size
                    </label>
                    <span className="text-white font-mono font-bold">{teamSize} people</span>
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
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Clock className="h-4 w-4" /> Hours wasted / person / week
                    </label>
                    <span className="text-white font-mono font-bold">{hoursPerWeek} hours</span>
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
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <DollarSign className="h-4 w-4" /> Avg. Hourly Cost
                    </label>
                    <span className="text-white font-mono font-bold">${hourlyRate}/hr</span>
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
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Annual Waste</div>
                  <div className="text-2xl md:text-3xl font-bold text-red-400 font-mono">
                    <Counter value={annualCost} prefix="$" />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Hours Lost</div>
                  <div className="text-2xl md:text-3xl font-bold text-white font-mono">
                    <Counter value={hoursWasted} suffix="h" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
