<template>
  <footer class="footer">
    <img src="~/assets/images/footer-montagnes.png" alt="fikas mountains" />
    <div class="container">
      <div class="wrapper">
        <div>
          <UILogosLogoFooter class="logo" />
          <p>
            &copy; FIKA(S) v4 {{ new Date().getFullYear() }} |
            {{ t("footer.copyright") }}
          </p>
        </div>
        <UIButtonsBtn
          class="newsletter"
          btn-style="button--full"
          @click="toggleNewsletter"
        >
          {{ t("newsletter.subscription") }}
        </UIButtonsBtn>
        <div class="social">
          <UIButtonsBtnFacebook class="social-btn" btn-style="link--footer" />
          <UIButtonsBtnInsta class="social-btn" btn-style="link--footer" />
          <UIButtonsBtnYoutube class="social-btn" btn-style="link--footer" />
        </div>
        <UIButtonsBtnScrollTop class="scroll-btn" />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { toggleNewsletter } = useMenu();
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;

  img {
    position: relative;
    top: 0.2rem;
    width: 100%;
  }

  .container {
    background-color: $aqua-blue;
    color: $white;
    font-family: $font-primary;
    position: relative;
    top: -0.2rem;

    .wrapper {
      margin: 0 auto;
      padding: 2rem 2rem 4rem;
      text-align: center;

      @include for-tablet-landscape-up {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 120rem;
        text-align: left;
      }
    }

    .logo {
      margin-bottom: 1.8rem;
    }

    .newsletter {
      margin: 3.5rem;
    }

    .social-btn {
      margin: 1rem;
    }

    .scroll-btn {
      margin-top: 4rem;

      @include for-tablet-landscape-up {
        margin-top: 0;
      }
    }
  }
}
</style>
