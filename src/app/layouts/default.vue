<script setup lang="ts">
import UiIcon from '~/components/UiIcon.vue';
</script>

<template>
  <div id="top">
    <a
      class="fixed -top-20 left-4 z-20 rounded-lg bg-ink px-[18px] py-3 text-[15px] font-semibold text-white focus:top-3 motion-safe:transition"
      href="#calculator"
      >Skip to calculator</a
    >
    <header class="border-b border-line bg-surface">
      <div
        class="mx-auto flex h-[84px] max-w-[1344px] items-center gap-[60px] px-8 max-lg:px-6 max-md:gap-9 max-sm:h-[72px] max-sm:gap-3 max-sm:px-4"
      >
        <a
          class="flex items-center gap-3 text-[17px] font-bold tracking-[-0.4px] motion-safe:transition max-sm:gap-2.5 max-sm:text-[15px]"
          href="#top"
          aria-label="Mad Games Tycoon 2 calculator home"
        >
          <img class="rounded-xl max-sm:size-10" src="/icons/favicon-96x96.png" alt="" width="46" height="46" />
          <span
            >Mad Games Tycoon <b class="text-accent">2</b
            ><small
              class="mt-0.5 block text-[12px] font-semibold uppercase tracking-[1.3px] text-muted max-sm:tracking-[0.8px]"
              >Design calculator</small
            ></span
          >
        </a>
        <nav
          class="flex gap-9 self-stretch text-[15px] font-semibold max-md:ml-auto max-sm:gap-0 max-sm:text-[13px] max-xs:hidden"
          aria-label="Main navigation"
        >
          <a
            class="relative flex items-center gap-1.5 text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-t-xs after:bg-accent after:content-[''] motion-safe:transition max-sm:hidden"
            href="#calculator"
            >Calculator</a
          >
          <a
            class="relative flex items-center gap-1.5 text-muted hover:text-accent motion-safe:transition"
            href="#topics"
            >Topic library <UiIcon class="size-3.5 max-sm:hidden" name="arrow"
          /></a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-[1344px] px-8 max-lg:px-6 max-sm:px-3">
      <slot />
      <footer class="flex justify-end pb-8 pt-7 text-[13px] text-muted max-sm:justify-center max-sm:px-2 max-sm:py-6">
        <a class="hover:text-accent motion-safe:transition" href="#top">Back to top ↑</a>
      </footer>
    </main>
  </div>
</template>
