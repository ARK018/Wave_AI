import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

const Create = () => {
  return (
    <div className="min-h-screen bg-[#131315] p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* John's Input Section */}
        <Card className="bg-[#131315] border-[#c4e456] border">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="w-full h-8 bg-[#1a1a1d] rounded" />
              <div className="w-full h-8 bg-[#1a1a1d] rounded" />
              <div className="w-full h-8 bg-[#1a1a1d] rounded" />
            </div>
          </CardContent>
        </Card>

        {/* Character Selection */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 border-dashed border-2 border-gray-600 bg-transparent text-gray-400 hover:bg-[#1a1a1d]"
            >
              + John
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-dashed border-2 border-gray-600 bg-transparent text-gray-400 hover:bg-[#1a1a1d]"
            >
              + Jane
            </Button>
          </div>
        </div>

        {/* Characters Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[#c4e456] text-lg font-medium">Characters</h2>
            <Button
              variant="outline"
              className="border-dashed border-2 border-gray-600 bg-transparent text-gray-400 hover:bg-[#1a1a1d]"
            >
              + New Character
            </Button>
          </div>

          <div className="space-y-2">
            <Button className="w-full justify-between bg-[#1a1a1d] hover:bg-[#242427] text-white border border-gray-800">
              John Shaw
              <Mic className="h-4 w-4 text-[#c4e456]" />
            </Button>
            <Button className="w-full justify-between bg-[#1a1a1d] hover:bg-[#242427] text-white border border-gray-800">
              Jane Austin
              {/* <Waveform className="h-4 w-4 text-[#c4e456]" /> */}
            </Button>
          </div>
        </div>

        {/* Voices AI Section */}
        <div className="space-y-4">
          <h2 className="text-[#c4e456] text-lg font-medium">Voices AI</h2>
          <div className="space-y-2">
            {[1, 2, 12].map((num) => (
              <Button
                key={num}
                className="w-full justify-between bg-[#1a1a1d] hover:bg-[#242427] text-white border border-gray-800"
              >
                Voice {num}
                {/* <Waveform className="h-4 w-4 text-[#c4e456]" /> */}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
