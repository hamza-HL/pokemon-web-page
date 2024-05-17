import React, { useState } from "react";
import { PokemonsList } from "../types";
import { useGetPokemonsQuery } from "../api";
import PokemonDetail from "./PokemonDetail";
import Spinner from "../common/Spinner";

const Pokemons: React.FC = ({}) => {
  const [page, setPage] = useState(1);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
    null
  );
  const {
    data: pokemonList,
    error,
    isLoading,
    isFetching,
  } = useGetPokemonsQuery<PokemonsList>(page);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">An error occurred</p>;

  return (
    <div className="text-center">
      <h4 className="text-3xl font-semibold mb-4 text-gray-600">POKEMONS</h4>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
          {pokemonList?.results.map((pokemon, index) => (
            <div
              key={index}
              className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 cursor-pointer flex p-4 bg-white rounded shadow-lg w-full max-w-sm justify-center items-center"
              onClick={() => {
                const id = Number(pokemon?.url.split("/").slice(-2)[0]);
                setSelectedPokemonId(id);
              }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  (page - 1) * 10 + index + 1
                }.png`}
                alt={pokemon?.name}
                className="w-16 h-16"
              />
              <p className="ml-4 text-lg font-semibold capitalize">
                {pokemon?.name}
              </p>
            </div>
          ))}
        </div>
      )}
      <div>
        <div className="mt-5">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded-full mr-2 disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-8 py-2 bg-gray-500 text-white rounded-full"
          >
            Next
          </button>
        </div>
      </div>

      {selectedPokemonId && (
        <PokemonDetail
          pokemonName={selectedPokemonId}
          onClose={() => setSelectedPokemonId(null)}
        />
      )}
    </div>
  );
};

export default Pokemons;
