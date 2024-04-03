<script lang="ts">
  import Container from "$lib/components/shared/Container.svelte"
  import { ContainerDimension } from "$lib/types"
  import type { PageData } from "./$types"

  export let data: PageData
</script>

<Container>
  <div class="wrap">
    <h1>Home Page</h1>
    <div class="description">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        dignissimos quasi recusandae suscipit dolor rem est esse praesentium
        fugiat vel ducimus et dicta blanditiis incidunt, beatae dolores ipsa ea
        minus, assumenda molestias soluta sunt ratione perferendis explicabo.
        Eveniet minima excepturi magnam fugiat, culpa mollitia accusantium
        repellat odio cum! Earum explicabo, perferendis id, perspiciatis
        consequatur amet nam asperiores accusantium accusamus officiis
        recusandae nesciunt iusto, rem at odio. Tempora vel atque dignissimos
        veritatis labore repudiandae magnam error debitis est quis, nobis totam
        dolorem quo id deserunt ad maiores soluta! Ipsa, quis? Culpa inventore
        minus odit maiores quo, provident quia? Corporis totam nemo excepturi
        fuga accusantium molestias quam, nulla, explicabo sunt, obcaecati
        ducimus necessitatibus maxime inventore labore minus illo quas ipsum
        optio adipisci? Natus esse, eius alias iure magni ab consequuntur aut
        unde deleniti ex! Quas eius, voluptas consequuntur nesciunt veritatis
        quibusdam assumenda veniam eos? Molestiae sunt ullam eligendi omnis
        officia corrupti quae architecto fugiat laudantium illum expedita, atque
        iusto placeat accusantium tempore delectus nulla obcaecati sint nemo
        magni esse aspernatur! Explicabo adipisci, dolorum quis nisi deleniti
        eum quod, porro earum ullam aspernatur officia. Ex perferendis, eligendi
        nemo ipsum nostrum error, nam magni voluptatum illum vitae maiores
        neque, blanditiis qui incidunt libero optio.
      </p>
    </div>
  </div>
</Container>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
</style>
