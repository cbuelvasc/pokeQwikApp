import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemons/pokemon-image";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    redirect(301, "/");
  }

  if (id < 1 || id > 898) {
    redirect(301, "/");
  }

  return id;
});

export default component$(() => {
  //const { params } = useLocation();
  const pokemonId = usePokemonId();

  return (
    <>
      {/* <span class="text-5xl">Pokemon: {params.id}</span> */}
      <span class="text-5xl">Pokemon: {pokemonId}</span>

      {/* <PokemonImage id={params.id} /> */}
      <PokemonImage id={pokemonId.value} />
    </>
  );
});
