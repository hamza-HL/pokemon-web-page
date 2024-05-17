import { render, waitFor, screen } from "@testing-library/react";
import { useGetPokemonByIdQuery } from "../../api";
import PokemonModal from "../PokemonDetail";

jest.mock("../../api");

const textMatcher = (expectedText: string, element: string) =>
  element.replace(/\s+/g, " ").toLowerCase() ===
  expectedText.replace(/\s+/g, " ").toLowerCase();

describe("PokemonModal Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it("renders loading state initially", async () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: true,
    });

    render(<PokemonModal pokemonName={1} onClose={() => {}} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state when there's an error", async () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: false,
    });

    render(<PokemonModal pokemonName={1} onClose={() => {}} />);

    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });

  it("renders pokemon details", async () => {
    const mockData = {
      data: {
        name: "bulbasaur",
        sprites: { front_default: "bulbasaur.png" },
        height: '7',
        weight: '69',
        types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
      },
      isError: false,
      isLoading: false,
    };

    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue(mockData);

    render(<PokemonModal pokemonName={1} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByAltText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText((element) => textMatcher("bulbasaur", element))).toBeInTheDocument();
    });
  });
});
