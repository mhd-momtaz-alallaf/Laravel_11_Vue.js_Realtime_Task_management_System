<template>
    <br />
    <br />
    <div class="row">
        <div class="row">
            <div class="col-md-4"></div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h2 align="center">Register</h2>
                            <br />
                            <br />
                            <form @submit.prevent="submitRegister">
                                <div class="form-group">
                                    <!-- Using the Error Component -->
                                    <Error
                                        label="E-Mail"
                                        :errors="v$.email.$errors"
                                    >
                                        <!-- Using the BaseInput Component -->
                                        <BaseInput v-model="registerInput.email" />
                                    </Error>
                                </div>

                                <div class="form-group">
                                    <!-- Using the Error Component -->
                                    <Error
                                        label="Password"
                                        :errors="v$.password.$errors"
                                    >
                                        <!-- Using the BaseInput Component -->
                                        <BaseInput v-model="registerInput.password"/>
                                    </Error>
                                </div>

                                <br />
                                <div class="form-group">
                                    <RouterLink to="/login">Login into your account</RouterLink>
                                </div>

                                <div class="form-group">
                                    <!-- Using the BaseBtn Component -->
                                    <BaseBtn label="register" :loading="loading"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            <div class="col-md-4"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { registerInput, useRegisterUser } from "./actions/register"; // importing the register action.
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const rules = {
    email: { required, email },
    password: { required },
};

const v$ = useVuelidate(rules, registerInput);

const { loading, register } = useRegisterUser();

// validating the input
async function submitRegister() {
    const result = await v$.value.$validate();

    if (!result)
        return;

    await register();
    v$.value.$reset()
}
</script>
