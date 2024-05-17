// src/components/PokemonModal.tsx
import React from "react";
import { useGetPokemonByIdQuery } from "../api";
import { PokemonQuery } from "../types";

interface PokemonModalProps {
  pokemonName: number;
  onClose: () => void;
}

const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemonName,
  onClose,
}) => {
  const {
    data: pokemonDetail,
    isError,
    isLoading,
  } = useGetPokemonByIdQuery<PokemonQuery>(pokemonName);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">An error occurred</p>;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-full p-16 shadow-lg flex flex-col items-center justify-center">
        <button
          className=" text-white text-sm bg-red-500 rounded-full p-2"
          onClick={onClose}
        >
          Close
        </button>
        {pokemonDetail && (
          <>
            <img
              src={pokemonDetail?.sprites?.front_default}
              alt={pokemonDetail?.name}
              className="w-40 h-40 rounded-full"
            />
            <h2 className="text-2xl font-semibold mb-2 capitalize text-green-600">
              {pokemonDetail?.name}
            </h2>
            <div className="text-center">
              <p>
                <span className="font-semibold">Height:</span>{" "}
                {pokemonDetail?.height} kg
              </p>
              <p>
                <span className="font-semibold">Weight:</span>{" "}
                {pokemonDetail?.weight} cm
              </p>
              <p className="">
                <span className="font-semibold">Types:</span>{" "}
                {pokemonDetail?.types
                  .map((type: any) => type?.type?.name)
                  .join(", ")}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonModal;
