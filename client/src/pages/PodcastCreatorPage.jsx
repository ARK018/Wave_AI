import { useState } from "react";
import { Play, Pause, ChevronLeft, Clock, Heart, Upload, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";


const PodcastLogo = () => (
<svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8 lg:w-12 lg:h-12 transition-transform duration-300 hover:scale-110"
>
    {/* SVG paths remain the same */}
    <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M20.9008 6.68909C21.1924 6.68909 21.4729 6.7832 21.6791 6.95127C21.8854 7.11933 22.0009 7.3479 22.0009 7.58545V21.0309C22.0009 21.2684 21.8854 21.497 21.6791 21.665C21.4729 21.8331 21.1924 21.9272 20.9008 21.9272C20.2931 21.9272 19.8008 21.5261 19.8008 21.0309V7.58546C19.8008 7.09024 20.2931 6.68909 20.9008 6.68909Z"
    fill="currentColor"
    className="text-[#c4e456]"
    />
    <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12.5004 10.2748C12.792 10.2748 13.0725 10.3689 13.2788 10.537C13.485 10.705 13.6005 10.9336 13.6005 11.1711V18.3419C13.6005 18.5794 13.485 18.808 13.2788 18.9761C13.0725 19.1441 12.792 19.2382 12.5004 19.2382C11.8927 19.2382 11.4004 18.8371 11.4004 18.3419V11.1712C11.4004 10.6759 11.8927 10.2748 12.5004 10.2748Z"
    fill="currentColor"
    className="text-[#c4e456]"
    />
    <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M25.101 12.0668C25.3925 12.0668 25.6731 12.1609 25.8793 12.329C26.0856 12.497 26.2011 12.7256 26.2011 12.9631V16.5485C26.2011 16.786 26.0856 17.0146 25.8793 17.1827C25.6731 17.3508 25.3926 17.4449 25.101 17.4449C24.4933 17.4449 24.001 17.0437 24.001 16.5485V12.9631C24.001 12.4679 24.4933 12.0668 25.101 12.0668Z"
    fill="currentColor"
    className="text-[#c4e456]"
    />
    <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8.30025 7.58521C8.59176 7.58521 8.87228 7.67932 9.07856 7.84739C9.28484 8.01545 9.40033 8.24402 9.40033 8.48156V21.0304C9.40033 21.2679 9.28482 21.4965 9.07856 21.6645C8.8723 21.8326 8.59179 21.9267 8.30025 21.9267C7.69247 21.9267 7.2002 21.5256 7.2002 21.0304V8.48158C7.2002 7.98635 7.69247 7.58521 8.30025 7.58521Z"
    fill="currentColor"
    className="text-[#c4e456]"
    />
    <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M4.10006 12.0668C4.39157 12.0668 4.67208 12.1609 4.87837 12.329C5.08465 12.497 5.20013 12.7256 5.20013 12.9631V16.5485C5.20013 16.786 5.08463 17.0146 4.87837 17.1827C4.67211 17.3508 4.39159 17.4449 4.10006 17.4449C3.49228 17.4449 3 17.0437 3 16.5485V12.9631C3 12.4679 3.49228 12.0668 4.10006 12.0668Z"
    fill="currentColor"
    className="text-[#c4e456]"
    />
    <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M16.7006 4C16.9922 4 17.2727 4.09411 17.479 4.26218C17.6852 4.43024 17.8007 4.65881 17.8007 4.89636V24.6159C17.8007 24.8534 17.6852 25.082 17.479 25.2501C17.2727 25.4181 16.9922 25.5122 16.7006 25.5122C16.0929 25.5122 15.6006 25.1111 15.6006 24.6159V4.89638C15.6006 4.40115 16.0929 4 16.7006 4Z"
    fill="currentColor"
    className="text-[#c4e456]"
    />
</svg>
);

const CreateEpisodeDialog = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
    const [newEpisode, setNewEpisode] = useState({
      title: "",
      description: "",
      thumbnail: null
    });
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      setNewEpisode(prev => ({
        ...prev,
        thumbnail: file
      }));
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewEpisode(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent default form submission
        console.log("New episode:", newEpisode);
        onOpenChange(false);
        navigate("/dashboard/create");
    };


    
    
  
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-white/55 backdrop-blur-none" />
      <DialogContent className="bg-[#1a1a1d] border border-[#c4e456]/30 max-w-lg p-6 space-y-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-2xl font-bold text-[#c4e456] tracking-tight">
            Create New Episode
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}  className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Episode Title"
              value={newEpisode.title}
              onChange={handleInputChange}
              className="w-full bg-[#222225] rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c4e456]/50 border border-transparent hover:border-[#c4e456]/20 transition-colors"
            />
            
            <textarea
              name="description"
              placeholder="Episode Description"
              value={newEpisode.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full bg-[#222225] rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c4e456]/50 border border-transparent hover:border-[#c4e456]/20 transition-colors"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-gray-400 text-sm font-medium">
              Thumbnail
            </label>
            <label className="flex items-center justify-center w-full h-14 bg-[#222225] rounded-lg cursor-pointer hover:bg-[#2a2a2d] transition-colors duration-300 border border-transparent hover:border-[#c4e456]/20">
              <Upload className="w-5 h-5 mr-2 text-[#c4e456]" />
              <span className="text-gray-400">
                {newEpisode.thumbnail ? newEpisode.thumbnail.name : 'Choose thumbnail'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#c4e456] text-black font-semibold rounded-lg py-4 flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#d0ff62] hover:scale-[1.02] mt-6"
      
          >
            <Plus className="w-5 h-5" />
            Create Episode
          </button>
        </form>
      </DialogContent>
    </Dialog>
    );
  };
  
  const PodcastCreatorPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [liked, setLiked] = useState([]);
  
    const podcast = {
      title: "AI & The Future",
      host: "Dr. Sarah Chen",
      description: "Explore the fascinating world of artificial intelligence and its impact on our daily lives. Join Dr. Sarah Chen as she breaks down complex AI concepts and interviews leading experts in the field.",
      cover: "/api/placeholder/400/400",
      totalEpisodes: "15",
      rating: 4.8,
      episodes: [
        {
          id: 1,
          title: "Ethics in AI Development",
          duration: "15:30",
          description: "An in-depth discussion about the ethical considerations in AI development and implementation.",
          thumbnail: "/api/placeholder/200/200",
          date: "Feb 3, 2025"
        },
        {
          id: 2,
          title: "AI & Creativity",
          duration: "10:20",
          description: "Exploring how AI is revolutionizing creative industries, from art generation to music composition.",
          thumbnail: "/api/placeholder/200/200",
          date: "Feb 1, 2025"
        }
      ],
    };
  
    const toggleLike = (episodeId) => {
      setLiked(prev => 
        prev.includes(episodeId) 
          ? prev.filter(id => id !== episodeId)
          : [...prev, episodeId]
      );
    };
  
    return (
      <div className="min-h-screen bg-[#131315] text-white pb-24">
        {/* Navigation Section */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#131315]/80 to-transparent">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between py-6">
              <div className="ml-8">
                <button className="group flex items-center px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-[#c4e456]/10">
                  <ChevronLeft className="w-6 h-6 text-[#c4e456] transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="text-[#c4e456] ml-2 font-medium">Back</span>
                </button>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <PodcastLogo />
                <span className="text-[#c4e456] font-bold text-xl transition-colors duration-300 group-hover:text-white">Wave</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Hero Section */}
        <div className="relative h-72 bg-gradient-to-b from-[#c4e456]/20 to-[#131315]">
          <div className="absolute inset-0 bg-[#131315]/40" />
        </div>
  
        {/* Main Content */}
        <div className="container mx-auto px-6 -mt-32 relative">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Podcast Info */}
            <div className="lg:w-1/3">
              <div className="bg-[#1a1a1d] rounded-2xl p-6 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative group">
                  <img 
                    src="/api/placeholder/400/400" 
                    alt="Podcast Cover" 
                    className="w-full rounded-lg shadow-lg mb-6 transition-transform duration-300 group-hover:scale-[1.02]" 
                  />
                </div>
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#c4e456] to-[#9fb846] bg-clip-text text-transparent">{podcast.title}</h1>
                <p className="text-gray-400 mb-4 hover:text-gray-300 transition-colors duration-300">Hosted by {podcast.host}</p>
                <p className="text-gray-300 mb-6 leading-relaxed">{podcast.description}</p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span className="hover:text-[#c4e456] transition-colors duration-300">{podcast.totalEpisodes} episodes</span>
                  <span className="flex items-center gap-1 hover:text-[#c4e456] transition-colors duration-300">
                    Rating: {podcast.rating}
                    <span className="text-yellow-400">⭐</span>
                  </span>
                </div>
              </div>
            </div>
  
            {/* Right Column - Episodes */}
            <div className="lg:w-2/3">
              <div className="space-y-6">
                {/* New Episode Button */}
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full bg-[#1a1a1d] rounded-xl p-6 border-2 border-dashed border-[#c4e456]/30 hover:border-[#c4e456]/50 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <Plus className="w-6 h-6 text-[#c4e456] transition-transform duration-300 group-hover:scale-125" />
                  <span className="text-xl font-semibold text-[#c4e456]">New Episode</span>
                </button>
  
                <CreateEpisodeDialog 
                  open={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
                />
  
                {/* Episodes List */}
                {podcast.episodes.map((episode) => (
                  <div 
                    key={episode.id} 
                    className="bg-[#1a1a1d] rounded-xl p-6 shadow-lg transition-all duration-300 hover:bg-[#222225] hover:shadow-2xl hover:scale-[1.02] group"
                  >
                    <div className="flex gap-6">
                      <div className="relative">
                        <img 
                          src={episode.thumbnail}
                          alt={episode.title} 
                          className="w-28 h-28 rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-xl font-semibold mb-1 transition-colors duration-300 group-hover:text-[#c4e456]">{episode.title}</h2>
                            <p className="text-gray-400 text-sm mb-2">{episode.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              className="p-2 text-gray-400 hover:text-[#c4e456] transition-all duration-300 hover:scale-110"
                              onClick={() => toggleLike(episode.id)}
                            >
                              <Heart className={`w-5 h-5 ${liked.includes(episode.id) ? 'fill-[#c4e456] text-[#c4e456]' : ''}`} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{episode.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                            <Clock className="w-4 h-4 mr-1" />
                            {episode.duration}
                          </div>
                          <button className="bg-[#c4e456] text-black rounded-full p-3 transition-all duration-300 hover:bg-[#d0ff62] hover:scale-110 hover:shadow-lg hover:shadow-[#c4e456]/20">
                            <Play className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Dialog */}
        <CreateEpisodeDialog 
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>
    );
  };
  
  export default PodcastCreatorPage;
