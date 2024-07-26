<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h3>Create Members</h3>
                <br/>
                <br/>
                <form @submit.prevent="submitMember">
                    <div class="form-group">
                        <Error label="Name" :errors="v$.name.$errors">
                            <BaseInput v-model="memberInput.name" />
                        </Error>
                    </div>

                    <div class="form-group">
                        <Error label="E-mail" :errors="v$.email.$errors">
                            <BaseInput v-model="memberInput.email" />
                        </Error>
                    </div>

                    <br/>
                    <RouterLink to="/members">See Members List</RouterLink>
                    <br/>

                    <div class="form-group">
                        <BaseBtn class="btn btn-primary" label="Create Member" :loading="loading" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { memberInput, useCreateOrUpdateMember } from ".//actions/createMember";

const rules = {
    email: { required, email },
    name: { required },
};

const v$ = useVuelidate(rules, memberInput);
const { loading, createOrUpdate } = useCreateOrUpdateMember();

async function submitMember() {
    const result = await v$.value.$validate();

    if (!result) return;

    await createOrUpdate();
    v$.value.$reset()
}
</script>
