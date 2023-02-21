import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export function useLoginForm() {
    const store = useStore();
    const router = useRouter();
    const { handleSubmit, isSubmitting, submitCount } = useForm()
    const { value: email, errorMessage: eError, handleBlur: eBlur  } = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Пожалуста введите email')
            .email('Необходимо ввести коректный email')
    );

    const MIN_LENGTH = 6;

    const {  value: password, errorMessage: pError, handleBlur: pBlur } = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Пожалуста введите проль')
            .min(MIN_LENGTH, `Пароь не может быть ${MIN_LENGTH} символов`)
    );

    const isToManyAttempts = computed(() => submitCount.value >= 3)

    watch(isToManyAttempts, val => {
        if(val){
            setTimeout(() => {
                submitCount.value = 0;
            }, 1500)
        }
    })

    const onSubmit = handleSubmit( async values => {
        await store.dispatch('auth/login', values)
        await router.push('/');
        // await store.dispatch('auth', values)
    })

    return {
        email,
        eError,
        eBlur,
        password,
        pError,
        pBlur,
        onSubmit,
        isSubmitting,
        isToManyAttempts
    }
}