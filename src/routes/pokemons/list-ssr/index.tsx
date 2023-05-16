import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
import type { BasicPokemonInfo, PokemonListResponse } from "~/interfaces";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=10`
  );
  const data = (await response.json()) as PokemonListResponse;
  return data.results;
});

export default component$(() => {
  const pokemonList = usePokemonList();

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Current offset: abcd</span>
        <span> Page is loading: abcd</span>
      </div>

      <div class="mt-10">
        <Link class="btn btn-primary mr-2">Previous</Link>
        <Link class="btn btn-primary mr-2">Next</Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemonList.value.map(({ name }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
  meta: [
    {
      name: "description",
      content: "SSR Page",
    },
  ],
};
