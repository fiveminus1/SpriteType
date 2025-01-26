"use client"

import { useState } from "react";

type SpriteProps = {
    onClose: () => void;
    onSelect: (sprite: string) => void;
};

const SpriteSelection: React.FC<SpriteProps> = ({onClose, onSelect}) => {
    const sprites = [
        { id: "totoro", name: "Totoro", image: "/characters/totoro.png"},
        { id: "bunny", name: "Bunny", image: "/characters/bunny.png"}
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Select a Sprite</h2>
                <div className="grid grid-cols-2 gap-4">
                    {sprites.map((sprite) => (
                        <div
                            key={sprite.id}
                            className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                            onClick={() => onSelect(sprite.image)}
                        >
                            <img
                                src={sprite.image}
                                alt={sprite.name}
                                className="w-16 h-16 mb-2"
                            />
                            <p className="text-sm">{sprite.name}</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default SpriteSelection;