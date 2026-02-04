<template>
  <form
    class="form"
    method="post"
    name="contact-form"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="contact-form" />
    <input type="hidden" name="bot-field" />
    <input
      class="input-text"
      type="text"
      name="firstname"
      :placeholder="$t('contact.first')"
    />
    <input
      class="input-text"
      type="text"
      name="lastname"
      :placeholder="$t('contact.last')"
      required
    />
    <input
      class="input-email"
      type="email"
      name="email"
      :placeholder="$t('contact.email')"
      required
    />
    <select name="subject">
      <option disabled selected>{{ $t("contact.selectSubject") }}</option>
      <option>{{ $t("contact.general") }}</option>
      <option>{{ $t("contact.volunteer") }}</option>
      <option>{{ $t("contact.partner") }}</option>
    </select>
    <textarea name="message" rows="12" cols="20" />
    <input
      class="input-submit"
      type="submit"
      :value="$t('contact.submit')"
      @click="onContact"
    />
  </form>
</template>

<script setup lang="ts">
const { track } = useAnalytics();

const onContact = () => {
  track("Contact");
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
}
</style>
