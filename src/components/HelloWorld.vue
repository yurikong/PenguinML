<template>{{ msg }}</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ msg?: string }>(), { msg: "Hello World" })
console.log("HelloWorld [props]:", props)
</script>
