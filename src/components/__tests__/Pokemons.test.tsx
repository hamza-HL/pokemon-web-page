import { render, waitFor } from "@testing-library/react";
import { useGetPokemonsQuery } from "../../api";
import Pokemons from "../Pokemons";

jest.mock("../../api", () => ({
  useGetPokemonsQuery: jest.fn(),
}));

describe("Pokemons Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isFetching: false,
    });

    const { getByText } = render(<Pokemons />);

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state when there's an error", async () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: "Some error",
      isLoading: false,
      isFetching: false,
    });

    const { getByText } = render(<Pokemons />);

    expect(getByText("An error occurred")).toBeInTheDocument();
  });

  it("renders pokemons list", async () => {
    const mockData = {
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      },
      error: undefined,
      isLoading: false,
      isFetching: false,
    };

    (useGetPokemonsQuery as jest.Mock).mockReturnValue(mockData);

    const { getByText } = render(<Pokemons />);

    await waitFor(() => {
      expect(getByText("bulbasaur")).toBeInTheDocument();
      expect(getByText("ivysaur")).toBeInTheDocument();
    });
  });
});
