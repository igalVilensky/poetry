declare module "#imports" {
  interface NuxtApp {
    $axios: any; // Define $axios as a global property
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $axios: any; // Define $axios for Vue components
  }
}

export {};
