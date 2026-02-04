<template>
  <form
    class="form"
    method="post"
    name="contact-form"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    @submit.prevent="handleSubmit"
  >
    <input type="hidden" name="form-name" value="contact-form" />
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
    <select name="subject" :disabled="isSubmitting">
      <option disabled selected>{{ $t("contact.selectSubject") }}</option>
      <option>{{ $t("contact.general") }}</option>
      <option>{{ $t("contact.volunteer") }}</option>
      <option>{{ $t("contact.partner") }}</option>
    </select>
    <textarea name="message" rows="12" cols="20" :disabled="isSubmitting" />
    <p
      v-if="submitStatus === 'success'"
      class="form-message form-message--success"
    >
      {{ $t("contact.success") }}
    </p>
    <p v-if="submitStatus === 'error'" class="form-message form-message--error">
      {{ $t("contact.error") }}
    </p>
    <input
      class="input-submit"
      type="submit"
      :value="submitButtonText"
      :disabled="isSubmitting"
    />
  </form>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { track } = useAnalytics();

const isSubmitting = ref(false);
const submitStatus = ref<"idle" | "success" | "error">("idle");

const submitButtonText = computed(() => {
  if (isSubmitting.value) return "...";
  return t("contact.submit");
});

const handleSubmit = async (event: Event) => {
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  isSubmitting.value = true;
  submitStatus.value = "idle";

  try {
    const response = await fetch("/netlify-forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(
        formData as unknown as Record<string, string>,
      ).toString(),
    });

    if (!response.ok) throw new Error("Submission failed");

    submitStatus.value = "success";
    track("Contact");
    form.reset();
  } catch {
    submitStatus.value = "error";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
.form {
  flex: 2;
  margin-bottom: 4rem;
  position: relative;

  @include for-tablet-landscape-up {
    padding-right: 6rem;
  }

  .input-text,
  .input-email,
  select,
  textarea {
    border: solid 0.2rem $perrywinkle;

    &::placeholder {
      color: rgba(48, 52, 66, 0.7);
    }
  }

  textarea {
    padding: 2rem;
  }

  .input-submit {
    align-self: flex-end;
    margin: 1rem 0 1rem 1rem;
  }

  .form-message {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.4rem;
    font-family: $font-primary;
    font-size: 1.3rem;

    &--success {
      background-color: rgba(76, 175, 80, 0.1);
      color: #2e7d32;
    }

    &--error {
      background-color: rgba(244, 67, 54, 0.1);
      color: #c62828;
    }
  }
}
</style>
