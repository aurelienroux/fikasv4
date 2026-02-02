<template>
  <div class="newsletter" :class="{ 'newsletter--open': newsletterOpen }">
    <p>{{ $t('newsletter.dontmiss') }}</p>
    <p>{{ $t('newsletter.subscribe') }}</p>
    <form
      method="post"
      name="newsletter-form"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="newsletter-form" />
      <input type="hidden" name="bot-field" />
      <input
        class="input-text"
        type="text"
        name="FirstName:"
        :placeholder="$t('contact.first')"
      />
      <input
        class="input-text"
        type="text"
        name="LastName:"
        :placeholder="$t('contact.last')"
        required
      />
      <input
        class="input-email"
        type="email"
        name="Email:"
        :placeholder="$t('contact.email')"
        required
      />
      <input
        class="input-submit"
        type="submit"
        :value="$t('contact.submit')"
        @click="onRegister"
      />
    </form>

    <button @click="closeNewsletter">
      <UIIconsIconClose />
    </button>
  </div>
</template>

<script setup lang="ts">
const { newsletterOpen, toggleNewsletter } = useMenu()
const { track } = useAnalytics()

const closeNewsletter = () => {
  toggleNewsletter()
}

const onRegister = () => {
  track('CompleteRegistration')
}
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
