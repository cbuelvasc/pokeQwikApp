import { $, component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const nav = useNavigate();
  const pokemonId = useSignal<number>(1);
  const showBackImage = useSignal<boolean>(false);
  const revealImage = useSignal<boolean>(true);

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) {
      return;
    }

    pokemonId.value += value;
  });

  const showPokemonBackImage = $(() => {
    showBackImage.value = !showBackImage.value;
  });

  const revealPokemonImage = $(() => {
    revealImage.value = !revealImage.value;
  });

  const goToPokemon = $(() => nav(`/pokemon/${pokemonId.value}/`));

  return (
    <>
      <span class="text-2xl">Simple search engine</span>
      <span class="text-9xl">{pokemonId}</span>

      <div onClick$={() => goToPokemon()}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={revealImage.value}
        />
      </div>

      <div class="mt-2">
        <button
          onClick$={() => changePokemonId(-1)}
          class="btn btn-primary mr-2"
        >
          Previous
        </button>

        <button
          onClick$={() => changePokemonId(1)}
          class="btn btn-primary mr-2"
        >
          Next
        </button>

        <button
          onClick$={() => showPokemonBackImage()}
          class="btn btn-primary mr-2"
        >
          Rotate
        </button>

        <button onClick$={() => revealPokemonImage()} class="btn btn-primary">
          Reveal
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "My first app in Qwik",
    },
  ],
};
