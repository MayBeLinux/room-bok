<script setup lang="ts">
import { ref } from 'vue'
import bckImage from '../assets/bck-login-register.png'
import iconImage from '../assets/icone-logn-register.png'
import framedSvg from '../assets/svg/Framed.svg'
import TextField from '../components/TextField.vue'

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
</script>

<template>
  <div
    class="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${bckImage})` }"
  >
    <div class="absolute inset-0 flex items-center justify-center">
      <div
        class="relative aspect-[1424/801]"
        :style="{
          width:
            'min(calc(100vw - 200px), calc((100vh - 120px) * 1424 / 801))',
        }"
      >
      <img
        :src="framedSvg"
        alt=""
        class="absolute inset-0 size-full"
      />

      <div
        class="absolute top-[28px] left-[24px] inline-flex h-[19px] w-[330px] items-center justify-center gap-[10px]"
      >
        <p
          class="font-space text-text-color text-[15px] font-medium whitespace-nowrap"
        >
          Room Book magic behind technic
        </p>
        <div class="bg-text-color h-px w-[235px]"></div>
      </div>
      <div>
        <p
          class="absolute bottom-[130px] left-[14px] font-space text-text-color text-[45px] font-medium whitespace-nowrap"
        >The magic</p>
        <p
          class="absolute bottom-[80px] left-[50px] font-space text-text-color text-[45px] font-medium whitespace-nowrap"
        >behind</p>
        <p
          class="absolute bottom-[30px] left-[76px] font-space text-text-color text-[45px] font-medium whitespace-nowrap"
          >Technologies</p>
      </div>

      <div class="absolute inset-0 grid grid-cols-[515fr_909fr]">
        <div></div>
        <div class="flex items-center justify-center">
          <form class="flex w-[284px] flex-col items-center gap-[5px]">
            <img
              :src="iconImage"
              alt=""
              class="h-[99px] w-[90px] object-contain"
            />

            <h1 class="font-space text-[40px] font-normal text-white">
              Register you
            </h1>

            <div class="flex w-full flex-col gap-[20px]">
              <label class="flex flex-col gap-[6px]">
                <span class="font-space text-[15px] font-light text-white/50">
                  Insert your email
                </span>
                <TextField v-model="email" type="email" placeholder="email" />
              </label>

              <label class="flex flex-col gap-[6px]">
                <span class="font-space text-[15px] font-light text-white/50">
                  Insert your password
                </span>
                <TextField
                  v-model="password"
                  type="password"
                  placeholder="password"
                />
              </label>

              <label class="flex flex-col gap-[6px]">
                <span class="font-space text-[15px] font-light text-white/50">
                  Re-insert your password
                </span>
                <TextField
                  v-model="passwordConfirm"
                  type="password"
                  placeholder="password"
                />
              </label>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
