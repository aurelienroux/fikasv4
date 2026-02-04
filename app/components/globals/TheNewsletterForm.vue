<template>
  <div class="newsletter" :class="{ 'newsletter--open': newsletterOpen }">
    <p>{{ $t("newsletter.dontmiss") }}</p>
    <p>{{ $t("newsletter.subscribe") }}</p>
    <form
      method="post"
      name="newsletter-form"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      @submit.prevent="handleSubmit"
    >
      <input type="hidden" name="form-name" value="newsletter-form" />
      <input type="hidden" name="bot-field" />
      <input
        class="input-text"
        type="text"
        name="firstname"
        :placeholder="$t('contact.first')"
        :disabled="isSubmitting"
      />
      <input
        class="input-text"
        type="text"
        name="lastname"
        :placeholder="$t('contact.last')"
        required
        :disabled="isSubmitting"
      />
      <input
        class="input-email"
        type="email"
        name="email"
        :placeholder="$t('contact.email')"
        required
        :disabled="isSubmitting"
      />
      <input
        class="input-submit"
        type="submit"
        :value="submitButtonText"
        :disabled="isSubmitting"
      />
    </form>

    <button @click="closeNewsletter">
      <UIIconsIconClose />
    </button>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { newsletterOpen, toggleNewsletter } = useMenu();
const { track } = useAnalytics();

const isSubmitting = ref(false);
const submitStatus = ref<'idle' | 'success' | 'error'>('idle');

const submitButtonText = computed(() => {
  if (isSubmitting.value) return '...';
  if (submitStatus.value === 'success') return '✓';
  return t('contact.submit');
});

const closeNewsletter = () => {
  toggleNewsletter();
};

const handleSubmit = async (event: Event) => {
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  isSubmitting.value = true;
  submitStatus.value = 'idle';

  try {
    const response = await fetch('/netlify-forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
    });

    if (!response.ok) throw new Error('Submission failed');

    submitStatus.value = 'success';
    track('CompleteRegistration');
    form.reset();

    setTimeout(() => closeNewsletter(), 1500);
  } catch {
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
.newsletter {
  align-items: center;
  background-color: $aqua-blue;
  bottom: 0;
  display: none;
  flex-direction: column;
  justify-content: center;
  left: 0;
  padding: 2rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
  opacity: 0;

  &--open {
    opacity: 1;
    display: flex;
  }

  p {
    color: $white;
    font-family: $font-secondary;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.42;
    text-align: center;
    text-transform: uppercase;

    @include for-tablet-landscape-up {
      font-size: 48px;
    }

    &:nth-child(2) {
      margin-bottom: 4rem;
      @include for-tablet-landscape-up {
        margin-bottom: 8rem;
      }
    }
  }

  button {
    align-items: center;
    background: transparent;
    border: none;
    color: $white;
    cursor: pointer;
    display: flex;
    font-size: 2.4rem;
    justify-content: center;
    padding: 2rem;
    position: absolute;
    right: 0;
    top: 0;

    @include for-tablet-landscape-up {
      margin: 2rem;
    }
  }

  .input-text,
  .input-email {
    border: solid 0.2rem $white;

    @include for-tablet-landscape-up {
      width: 40rem;
    }

    &::placeholder {
      color: $white;
    }
  }

  .input-submit {
    align-self: center;
    margin-top: 2rem;
  }
}
</style>
