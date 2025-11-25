import { useState, useEffect } from 'react';
import { Download, Tag, Database } from 'lucide-react';
import { motion } from 'framer-motion';

interface DockCard {
    id: string;
    title: string;
    description: string;
    image_url: string;
    file_url: string;
    type: 'character' | 'world' | 'plot';
    tags: string[];
    author: string;
}

const CardDock = () => {
    const [cards, setCards] = useState<DockCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'character' | 'world' | 'plot'>('all');

    useEffect(() => {
        // Simulate fetching from a registry
        // In a real app, this would fetch a JSON index from public/cards/index.json
        const sampleCards: DockCard[] = [
            {
                                        < span className = {`px-2 py-1 rounded text-xs font-bold uppercase ${card.type === 'character' ? 'bg-blue-500 text-white' :
                card.type === 'world' ? 'bg-green-500 text-white' :
                    'bg-purple-500 text-white'
                }`}>
    { card.type }
                                        </span >
                                    </div >
                                </div >

    <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{card.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
            {card.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded-full flex items-center gap-1">
                    <Tag size={10} />
                    {tag}
                </span>
            ))}
        </div>

        <button
            onClick={() => handleDownload(card)}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
            <Download size={18} />
            Download PNG
        </button>
    </div>
                            </motion.div >
                        ))}
                    </div >
                )}
            </div >
        </div >
    );
};

export default CardDock;
