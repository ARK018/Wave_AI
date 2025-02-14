import React, { useState } from 'react';
import { Mic, Plus, Sparkles, Save, Trash2, User, Volume2, Wand2, Info, Image as ImageIcon, Clock, MessageSquare } from 'lucide-react';

const PodcastCreator = () => {
  const [audioUrl, setAudioUrl] = useState("");  
  const episodeData = {
    podcastName: "Tech Talk Weekly",
    episodeTitle: "The Future of AI",
    episodeNumber: "Episode 42",
    description: "Exploring the latest developments in artificial intelligence and its impact on society.",
    thumbnailUrl: "/api/placeholder/400/225"
  };

  const [characters, setCharacters] = useState([]);
  const [dialogs, setDialogs] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState({
    name: '',
    voice: 'aura-asteria-en'
  });

  const voiceOptions = [
    { id: 'aura-asteria-en', name: 'aura-asteria-en' },      
    { id: 'aura-luna-en', name: 'aura-luna-en' },
    { id: 'aura-arcas-en', name: 'aura-arcas-en' },
    { id: 'aura-stella-en', name: 'aura-stella-en' },
    { id: 'aura-helios-en', name: 'aura-helios-en' }
  ];

  const handleAddCharacter = () => {
    if (currentCharacter.name) {
      setCharacters([...characters, { ...currentCharacter, id: Date.now() }]);
      setCurrentCharacter({ name: '', voice: voiceOptions[0].id });
    }
  };

  const handleAddDialog = () => {
    if (characters.length === 0) {
      alert("Please create at least one character first!");
      return;
    }
    setDialogs([...dialogs, { 
      id: Date.now(),
      characterId: characters[0]?.id,
      content: ''
    }]);
  };

  const handleGenerateAIDialog = () => {
    console.log('Generating AI dialog...');
  };

  const handleDeleteCharacter = (id) => {
    setCharacters(characters.filter(char => char.id !== id));
  };

  const handleDeleteDialog = (id) => {
    setDialogs(dialogs.filter(dialog => dialog.id !== id));
  };

  const handleSaveEpisode = async () => {
    const scriptData = dialogs.map(dialog => {
      const character = characters.find(char => char.id === dialog.characterId);
      return character ? { character: character.name, text: dialog.content, voice: character.voice } : null;
    }).filter(item => item !== null);

    if (scriptData.length === 0) {
      alert("Please enter valid character names and dialogues.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/generate-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: scriptData })
      });

      const data = await response.json();
      if (data.success) {
        setAudioUrl(data.audioUrl);
      } else {
        alert("Error generating audio: " + data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Failed to generate audio.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#131315] text-gray-200">
      {/* Top Navigation Bar */}
      <nav className="w-full bg-[#1a1a1c] border-b border-[#c4e456]/20">
        <div className="w-full max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-[#c4e456] text-xl font-bold">Podcast Studio</h1>
            <div className="flex gap-4">
              <button 
                onClick={handleGenerateAIDialog}
                className="flex items-center gap-2 bg-[#1f1f23] text-[#c4e456] px-4 py-2 rounded-lg font-medium hover:bg-[#27272b] transition-all text-sm"
              >
                <Wand2 size={16} />
                AI Assistant
              </button>
              <button 
                onClick={handleSaveEpisode}
                className="bg-[#c4e456] text-[#131315] px-4 py-2 rounded-lg font-medium hover:bg-[#b3d149] transition-all flex items-center gap-2 text-sm"
              >
                <Save size={16} />
                Save Episode
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Episode Info Bar */}
      <div className="w-full bg-[#1f1f23] border-b border-[#c4e456]/20">
        <div className="w-full max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-6">
            <img 
              src={episodeData.thumbnailUrl} 
              alt="Episode thumbnail" 
              className="w-40 h-24 object-cover rounded-lg border border-[#c4e456]/20"
            />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-semibold">{episodeData.episodeTitle}</h2>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <Clock size={14} />
                  {episodeData.episodeNumber}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{episodeData.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-screen-2xl mx-auto px-6 py-6">
        <div className="flex gap-6 h-[calc(100vh-220px)]">
          {/* Dialog Section - 70% width */}
          <div className="flex-[0.7] bg-[#1a1a1c] rounded-lg border border-[#c4e456]/20 flex flex-col">
            <div className="p-4 border-b border-[#c4e456]/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-[#c4e456]" />
                  <h3 className="text-lg font-bold">Dialog Creator</h3>
                  <span className="text-gray-400 text-xs">({dialogs.length} lines)</span>
                </div>
                <button 
                  onClick={handleAddDialog}
                  className="flex items-center gap-2 bg-[#c4e456] text-[#131315] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#b3d149] transition-all"
                >
                  <Plus size={16} />
                  Add Dialog
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {dialogs.map((dialog, index) => (
                <div key={dialog.id} className="flex gap-4 items-start group">
                  <select 
                    className="w-40 bg-[#1f1f23] border border-[#c4e456]/20 rounded-md p-2 text-sm hover:border-[#c4e456]/40 focus:border-[#c4e456] focus:outline-none"
                    value={dialog.characterId}
                    onChange={(e) => {
                      const newDialogs = [...dialogs];
                      newDialogs[index].characterId = parseInt(e.target.value);
                      setDialogs(newDialogs);
                    }}
                  >
                    {characters.map(char => (
                      <option key={char.id} value={char.id}>{char.name}</option>
                    ))}
                  </select>
                  <div className="flex-1 relative">
                    <textarea 
                      className="w-full bg-[#1f1f23] border border-[#c4e456]/20 rounded-md p-3 min-h-[100px] text-sm hover:border-[#c4e456]/40 focus:border-[#c4e456] focus:outline-none resize-none"
                      placeholder="Enter dialog..."
                      value={dialog.content}
                      onChange={(e) => {
                        const newDialogs = [...dialogs];
                        newDialogs[index].content = e.target.value;
                        setDialogs(newDialogs);
                      }}
                    />
                    <button 
                      onClick={() => handleDeleteDialog(dialog.id)}
                      className="absolute top-3 right-3 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Characters Section - 30% width */}
          <div className="flex-[0.3] bg-[#1a1a1c] rounded-lg border border-[#c4e456]/20 flex flex-col">
            <div className="p-4 border-b border-[#c4e456]/20">
              <div className="flex items-center gap-2 mb-4">
                <User size={18} className="text-[#c4e456]" />
                <h3 className="text-lg font-bold">Characters</h3>
                <span className="text-gray-400 text-xs">({characters.length})</span>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Character Name"
                  className="w-full bg-[#1f1f23] border border-[#c4e456]/20 rounded-md p-2 text-sm hover:border-[#c4e456]/40 focus:border-[#c4e456] focus:outline-none"
                  value={currentCharacter.name}
                  onChange={(e) => setCurrentCharacter({
                    ...currentCharacter,
                    name: e.target.value
                  })}
                />
                <div className="flex gap-2">
                  <select
                    className="flex-1 bg-[#1f1f23] border border-[#c4e456]/20 rounded-md p-2 text-sm hover:border-[#c4e456]/40 focus:border-[#c4e456] focus:outline-none"
                    value={currentCharacter.voice}
                    onChange={(e) => setCurrentCharacter({
                      ...currentCharacter,
                      voice: e.target.value
                    })}
                  >
                    {voiceOptions.map(voice => (
                      <option key={voice.id} value={voice.id}>{voice.name}</option>
                    ))}
                  </select>
                  <button 
                    onClick={handleAddCharacter}
                    className="bg-[#c4e456] text-[#131315] px-4 rounded-md hover:bg-[#b3d149] transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {characters.map(character => (
                <div 
                  key={character.id} 
                  className="group bg-[#1f1f23] rounded-lg p-3 flex items-center justify-between border border-[#c4e456]/10 hover:border-[#c4e456]/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#c4e456]/10 rounded-full flex items-center justify-center">
                      <User size={16} className="text-[#c4e456]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{character.name}</h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Volume2 size={12} className="text-[#c4e456]" />
                        {character.voice}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteCharacter(character.id)}
                    className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PodcastCreator;