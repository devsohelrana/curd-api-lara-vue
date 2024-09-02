<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';


const route = useRoute();
const studentId = route.params.id;

// // Define a ref to store the new student's data
const studentInfo = ref({
    name: '',
    phone: '',
    roll: '',
    registration_no: '',
    department: '',
    session: '',
    district: ''
});

const errors = ref({});
const loading = ref(false);


// Function to fetch students' data from the API
const fetchStudents = async () => {
    try {
        const response = await axios.get(`https://curd-api.test/api/students/${studentId}`);
        studentInfo.value = response.data.student;
    } catch (error) {

        if (error.response) {
            if (error.response.status === 404) {
                // Show toast message
                toast.error(`${error.response.data.message || 'Student not found!'}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 5000,
                });
            }
        } else {
            // Handle other types of errors if necessary
            toast.error('Student not found!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 5000,
            });
        }

    } finally {
        loading.value = false;
    }
};


const updateStudent = async () => {
    loading.value = true;
    errors.value = {}; // Clear previous errors
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/students/${studentId}`, studentInfo.value);

        // success message
        toast.success(`${response.data.message || 'Student updated successfully!'}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000,
        });
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors || {};
        } else {
            // error message
            toast.error(`${error.message || 'Failed to update student. try again!'}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 5000,
            });
        }
    } finally {
        loading.value = false;
    }
};

// Fetch the data when the component is mounted
onMounted(fetchStudents);

</script>



<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Edit Student</h2>
        <form @submit.prevent="updateStudent">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
                <!-- Name -->
                <div class="col-span-2 lg:col-span-1 space-y-1">
                    <label for="name" class="text-primary font-semibold text-lg">Name</label>
                    <input v-model="studentInfo.name" id="name" :class="[
                        'w-full border outline-none p-2 rounded focus:ring-2',
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-blue-300 focus:ring-blue-400'
                    ]" placeholder="Enter your name" />

                    <span v-if="errors.name" class="text-red-400 font-poppins text-sm">{{ errors.name[0] }}</span>
                </div>
                <!-- Phone -->
                <div class="col-span-2 lg:col-span-1 space-y-1">
                    <label for="phone" class="text-primary font-semibold text-lg">Phone Number</label>
                    <input v-model="studentInfo.phone" id="phone" :class="[
                        'w-full border outline-none p-2 rounded focus:ring-2',
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-blue-300 focus:ring-blue-400'
                    ]" placeholder="Enter your phone number" />

                    <span v-if="errors.phone" class="text-red-400 font-poppins text-sm">{{ errors.phone[0] }}</span>
                </div>
                <!-- Roll -->
                <div class="col-span-2 lg:col-span-1 space-y-1">
                    <label for="roll" class="text-primary font-semibold text-lg">Roll</label>
                    <input v-model="studentInfo.roll" id="roll" :class="[
                        'w-full border outline-none p-2 rounded focus:ring-2',
                        errors.roll ? 'border-red-500 focus:ring-red-500' : 'border-blue-300 focus:ring-blue-400'
                    ]" placeholder="Enter your roll number" />
                    <span v-if="errors.roll" class="text-red-400 font-poppins text-sm">{{ errors.roll[0] }}</span>
                </div>
                <!-- Registration No. -->
                <div class="col-span-2 lg:col-span-1 space-y-1">
                    <label for="registration" class="text-primary font-semibold text-lg">Registration No.</label>
                    <input v-model="studentInfo.registration_no" id="registration" :class="[
                        'w-full border outline-none p-2 rounded focus:ring-2',
                        errors.registration_no ? 'border-red-500 focus:ring-red-500' : 'border-blue-300 focus:ring-blue-400'
                    ]" placeholder="Enter your registration number" />
                    <span v-if="errors.registration_no" class="text-red-400 font-poppins text-sm">{{
                        errors.registration_no[0] }}</span>
                </div>
                <!-- Department -->
                <div class="col-span-2 lg:col-span-1 space-y-1">
                    <label for="department" class="text-primary font-semibold text-lg">Department</label>
                    <input v-model="studentInfo.department" id="department" :class="[
                        'w-full border outline-none p-2 rounded focus:ring-2',
                        errors.department ? 'border-red-500 focus:ring-red-500' : 'border-blue-300 focus:ring-blue-400'
                    ]" placeholder="Enter your department" />
                    <span v-if="errors.department" class="text-red-400 font-poppins text-sm">{{ errors.department[0]
                        }}</span>
                </div>
                <!-- Session -->
                <div class="col-span-2 lg:col-span-1 space-y-1">
                    <label for="session" class="text-primary font-semibold text-lg">Session</label>
                    <input v-model="studentInfo.session" id="session" :class="[
                        'w-full border outline-none p-2 rounded focus:ring-2',
                        errors.session ? 'border-red-500 focus:ring-red-500' : 'border-blue-300 focus:ring-blue-400'
                    ]" placeholder="Enter your session" />
                    <span v-if="errors.session" class="text-red-400 font-poppins text-sm">{{ errors.session[0] }}</span>
                </div>
                <!-- District -->
                <div class="col-span-2 lg:col-span-1 space-y-1">
                    <label for="district" class="text-primary font-semibold text-lg">District</label>
                    <input v-model="studentInfo.district" id="district" :class="[
                        'w-full border outline-none p-2 rounded focus:ring-2',
                        errors.district ? 'border-red-500 focus:ring-red-500' : 'border-blue-300 focus:ring-blue-400'
                    ]" placeholder="Enter your District" />
                    <span v-if="errors.district" class="text-red-400 font-poppins text-sm">{{ errors.district[0]
                        }}</span>
                </div>

                <div class="col-span-2 space-y-1 flex justify-center items-center">
                    <button type="submit"
                        class="flex justify-center items-center gap-4 border border-secondary outline-none p-2 px-14 rounded bg-indigo-500 text-white focus:ring-2">
                        Update
                        <span v-if="loading">
                            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped></style>