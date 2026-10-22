<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import bckImage from '../assets/bck-login-register.png'
import iconImage from '../assets/icone-logn-register.png'
import framedSvg from '../assets/svg/Framed.svg'
import TextField from '../components/TextField.vue'
import { api } from '../api/client'
import { useAuthStore, type AuthUser } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)
const isSubmitting = ref(false)

async function onSubmit() {
  errorMessage.value = null
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in your email and password'
    return
  }
  isSubmitting.value = true
  try {
    const { data } = await api.post<{ token: string; user: AuthUser }>('/auth/login', {
      email: email.value,
      password: password.value,
    })
    auth.setSession(data.token, data.user)
    router.push({ name: 'booking' })
  } catch (error) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined
    if (status === 401) errorMessage.value = 'Wrong email or password'
    else if (status === 400) errorMessage.value = 'Please enter a valid email'
    else errorMessage.value = 'Unable to reach the server, try again later'
  } finally {
    isSubmitting.value = false
  }
}
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
          <form
            class="flex w-[284px] flex-col items-center gap-[37px]"
            novalidate
            @submit.prevent="onSubmit"
          >
            <img
              :src="iconImage"
              alt=""
              class="h-[99px] w-[90px] object-contain"
            />

            <h1 class="font-space text-[40px] font-normal text-white">
              Login you
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

              <p
                v-if="errorMessage"
                role="alert"
                class="font-space text-sm font-medium text-unvaible-room"
              >
                {{ errorMessage }}
              </p>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full max-w-xs cursor-pointer rounded-[14px] border-[1.5px] border-solid border-accent-green bg-background-zone px-3 py-2 font-space text-sm font-medium text-text-color shadow-[9px_8px_1.5px_-5px_rgba(0,0,0,0.25)] transition-colors hover:bg-accent-green/30 disabled:cursor-wait disabled:opacity-60"
              >
                {{ isSubmitting ? 'Logging in…' : 'Login' }}
              </button>
            </div>

            <p class="font-space text-[15px] font-light text-white">
              don't have an account ?
              <RouterLink to="/register" class="underline">Sign up</RouterLink>
            </p>
          </form>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
