<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";

import EditIcon from "./icons/IconEdit.vue";
import DeleteIcon from "./icons/IconDelete.vue";

const errorSound = ref(new Audio("/sounds/iphone.mp3"));

// Define reactive references
const students = ref([]);
const loading = ref(true);
const selectedItems = ref([]);
const selectAll = ref(false);

// Function to fetch students' data from the API
const fetchStudents = async () => {
  try {
    const response = await axios.get("https://curd-api.test/api/students");
    students.value = response.data.students;
  } catch (error) {
    if (error.response) {
      if (
        error.response.data ||
        error.response.status ||
        error.response.headers
      ) {
        toast.info(`${error.message || "Students not found!"}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
        });
      } else if (error.request) {
        // Toast message
        toast.error(
          `${error.message || "Failed to load students. try again!"}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000,
          }
        );
      }
    } else {
      // Toast message
      toast.error(`${error.message || "Failed to load students. try again!"}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  } finally {
    loading.value = false;
  }
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = students.value.map((student) => student.id);
  } else {
    selectedItems.value = [];
  }
};

watch(selectedItems, (newSelectedItems) => {
  selectAll.value = newSelectedItems.length === students.value.length;
});

// Student delete
const deleteStudent = async (studentId) => {
  try {
    // Send DELETE request to the API
    const response = await axios.delete(
      `https://curd-api.test/api/students/${studentId}`
    );

    errorSound.value.play();
    // Handle successful response
    toast.success("Student deleted successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });

    // Remove the deleted student from the students list
    // students.value = students.value.filter(
    //   (student) => student.id !== studentId
    // );

    // Implement your delete logic here
    const remainingItems = students.value.filter(
      (student) => !selectedItems.value.includes(student.id)
    );
    students.value = remainingItems;
    selectedItems.value = [];
  } catch (error) {
    // Handle error response
    toast.error("Failed to delete student.", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  }
};

// Fetch the data when the component is mounted
onMounted(fetchStudents);
</script>

<template>
  <div>
    <h2 class="text-center font-roboto text-xl text-green-600 font-bold py-4">
      All student lists PUST Department of Business Administration
    </h2>
    <table class="w-full table-auto">
      <thead>
        <tr>
          <th class="border-collapse border border-gray-200">
            <input
              type="checkbox"
              v-model="selectAll"
              @change="toggleSelectAll"
            />
          </th>
          <th class="border-collapse border border-gray-200">Name</th>
          <th class="border-collapse border border-gray-200">Roll</th>
          <th class="border-collapse border border-gray-200">
            Registration No.
          </th>
          <th class="border-collapse border border-gray-200">Department</th>
          <th class="border-collapse border border-gray-200">Session</th>
          <th class="border-collapse border border-gray-200">District</th>
          <th class="border-collapse border border-gray-200">Phone</th>
          <th class="border-collapse border border-gray-200">Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- Data fetching loader -->
        <tr v-if="loading" v-for="n in 8" :key="n" class="animate-pulse">
          <td class="h-8 border-collapse border border-gray-200">
            <div class="flex justify-center items-center">
              <div class="h-3 w-3/4 bg-slate-400 rounded-xl"></div>
            </div>
          </td>
          <td class="h-8 border-collapse border border-gray-200">
            <div class="flex justify-center items-center">
              <div class="h-3 w-3/4 bg-slate-400 rounded-xl"></div>
            </div>
          </td>
          <td class="h-8 border-collapse border border-gray-200">
            <div class="flex justify-center items-center">
              <div class="h-3 w-3/4 bg-slate-400 rounded-xl"></div>
            </div>
          </td>
          <td class="h-8 border-collapse border border-gray-200">
            <div class="flex justify-center items-center">
              <div class="h-3 w-3/4 bg-slate-400 rounded-xl"></div>
            </div>
          </td>
          <td class="h-8 border-collapse border border-gray-200">
            <div class="flex justify-center items-center">
              <div class="h-3 w-3/4 bg-slate-400 rounded-xl"></div>
            </div>
          </td>
          <td class="h-8 border-collapse border border-gray-200">
            <div class="flex justify-center items-center">
              <div class="h-3 w-3/4 bg-slate-400 rounded-xl"></div>
            </div>
          </td>
          <td class="h-8 border-collapse border border-gray-200">
            <div class="flex justify-center items-center">
              <div class="h-3 w-3/4 bg-slate-400 rounded-xl"></div>
            </div>
          </td>
          <td class="h-8 border-collapse border border-gray-200">
            <div class="flex justify-center items-center">
              <div class="h-3 w-3/4 bg-slate-400 rounded-xl"></div>
            </div>
          </td>
          <td class="h-8 border-collapse border border-gray-200">
            <div class="flex justify-center items-center gap-5">
              <div class="h-6 w-6 bg-slate-400 rounded-full"></div>
              <div class="h-6 w-6 bg-slate-400 rounded-full"></div>
            </div>
          </td>
        </tr>

        <tr class="text-center" v-for="student in students" :key="student.id">
          <td class="border-collapse border border-gray-200">
            <input
              type="checkbox"
              :value="student.id"
              v-model="selectedItems"
            />
          </td>
          <td class="border-collapse border border-gray-200">
            {{ student.name }}
          </td>
          <td class="border-collapse border border-gray-200">
            {{ student.roll }}
          </td>
          <td class="border-collapse border border-gray-200">
            {{ student.registration_no }}
          </td>
          <td class="border-collapse border border-gray-200">
            {{ student.department }}
          </td>
          <td class="border-collapse border border-gray-200">
            {{ student.session }}
          </td>
          <td class="border-collapse border border-gray-200">
            {{ student.district }}
          </td>
          <td class="border-collapse border border-gray-200">
            {{ student.phone }}
          </td>
          <td class="border-collapse border border-gray-200">
            <div class="flex justify-center items-center gap-5">
              <RouterLink
                :to="{ path: '/student/' + student.id }"
                class="font-poppins text-md font-medium hover:text-blue-600"
              >
                <EditIcon />
              </RouterLink>
              <button
                @click="deleteStudent(student.id)"
                :class="{
                  'hover:text-red-600 focus:text-red-600': true,
                  hidden: selectedItems.length === 0,
                }"
              >
                <DeleteIcon />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
