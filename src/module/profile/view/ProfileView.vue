<script setup>
import { reactive } from "vue";
import {
  mdiAccount,
  mdiAccountPlus,
  mdiFormatListBulletedSquare,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import baseApi from "../api/baseApi";

const nameLogin = JSON.parse(localStorage.getItem("user"));

const labelPosition = ref("top");
const dialogVisible = ref(false);

const tableData = ref();
const ruleFormCreateUserRef = ref();
const ruleFormCreateUser = reactive({
  user: "",
  role: 0,
  pass: "",
  checkPass: "",
});

const ruleFormEditUserRef = ref();
const ruleFormEditUser = reactive({
  user: "",
  pass: "",
  checkPass: "",
});

const validatePassFormCreate = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleFormCreateUser.checkPass !== "") {
      if (!ruleFormCreateUserRef.value) return;
      ruleFormCreateUserRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validateCheckPassFormCreate = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleFormCreateUser.pass) {
    callback(new Error("Re-Password inputs don't match!"));
  } else {
    callback();
  }
};

const validatePassFormEdit = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleFormEditUser.checkPass !== "") {
      if (!ruleFormEditUserRef.value) return;
      ruleFormEditUserRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validateCheckPassFormEdit = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleFormEditUser.pass) {
    callback(new Error("Re-Password inputs don't match!"));
  } else {
    callback();
  }
};

const optionsRole = [
  { value: 0, label: "Admin" },
  { value: 10, label: "Engineer" },
  { value: 20, label: "Operator" },
  { value: 30, label: "Viewer" },
  { value: 40, label: "Cloud" },
];

const rulesCreate = reactive({
  user: [
    {
      required: true,
      message: "Please input Activity Name",
      trigger: "blur",
    },
  ],
  role: [
    {
      required: true,
      message: "Please select Activity Group",
      trigger: "change",
    },
  ],
  pass: [
    { required: true, validator: validatePassFormCreate, trigger: "blur" },
    { min: 6, max: 16, message: "Length should min 6", trigger: "blur" },
  ],
  checkPass: [
    { required: true, validator: validateCheckPassFormCreate, trigger: "blur" },
  ],
});

const rulesEdit = reactive({
  user: [
    {
      required: true,
      message: "Please input Activity Name",
      trigger: "blur",
    },
  ],
  pass: [
    { required: true, validator: validatePassFormEdit, trigger: "blur" },
    { min: 6, max: 16, message: "Length should min 6", trigger: "blur" },
  ],
  checkPass: [
    { required: true, validator: validateCheckPassFormEdit, trigger: "blur" },
  ],
});

// # Create new User
const resetFormCreate = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const submitFormCreate = (formEl) => {
  formEl.validate((valid, fields) => {
    if (valid) {
      createNewUser();
    } else {
      console.log("error submit!", fields);
    }
  });
};
const createNewUser = () => {
  let dataLoad = {
    user: ruleFormCreateUser.user,
    password: ruleFormCreateUser.pass,
    role: ruleFormCreateUser.role,
  };
  baseApi
    .addUser(dataLoad)
    .then((res) => {
      ElMessage({
        message: "Successfully !",
        grouping: true,
        showClose: true,
        type: "success",
      });
      getListUser();
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      false;
    });
};

// # Edit new User
const handleEdit = (index, data) => {
  (ruleFormEditUser.user = data.user),
    (ruleFormEditUser.pass = ruleFormEditUser.checkPass = "");

  dialogVisible.value = true;
};

const submitFormEdit = () => {
  console.log(ruleFormEditUserRef);
  ruleFormEditUserRef.value.validate((valid, fields) => {
    if (valid) {
      updateUser();
    } else {
      console.log("error submit!", fields);
    }
  });
};

const updateUser = () => {
  let dataLoad = {
    user: ruleFormEditUser.user,
    password: ruleFormEditUser.pass,
  };
  baseApi
    .updateUser(dataLoad)
    .then((res) => {
      dialogVisible.value = false;
      ElMessage({
        message: "Successfully !",
        grouping: true,
        showClose: true,
        type: "success",
      });
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      false;
    });
};

// # delete User
const handleDelete = (index, data) => {
  ElMessageBox.confirm(
    "Will permanently delete the account. Continue?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      deleteUser(data.user);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

const deleteUser = (user) => {
  let dataLoad = {
    data: {
      user: user,
    },
    header: {},
  };
  baseApi
    .deleteUser(dataLoad)
    .then((res) => {
      ElMessage({
        message: "Delete completed",
        grouping: true,
        showClose: true,
        type: "success",
      });
      getListUser();
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      false;
    });
};

// # Get list User
const getListUser = async () => {
  await baseApi
    .getListUser()
    .then((res) => {
      res.data.map((account) => {
        optionsRole.forEach((item) => {
          if (item.value === account.role) {
            account.group = item.label;
          }
        });
      });
      tableData.value = res.data;
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      false;
    });
};
getListUser();
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
      </SectionTitleLineWithButton>

      <UserCard class="mb-6" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CardBox class="lg:col-span-2">
          <SectionTitleLineWithButton
            :icon="mdiFormatListBulletedSquare"
            title="List User"
          >
          </SectionTitleLineWithButton>
          <div class="w-full">
            <el-table :data="tableData">
              <el-table-column
                prop="user"
                label="Username"
                style="width: 30%"
              />
              <el-table-column prop="group" label="Group" style="width: 30%" />
              <el-table-column align="center" style="width: 40%">
                <template #default="scope">
                  <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)"
                    >Edit</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >Delete</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </CardBox>

        <CardBox>
          <SectionTitleLineWithButton
            :icon="mdiAccountPlus"
            title="Create New User"
          >
          </SectionTitleLineWithButton>
          <el-form
            ref="ruleFormCreateUserRef"
            :model="ruleFormCreateUser"
            :rules="rulesCreate"
            :label-position="labelPosition"
            status-icon
          >
            <el-form-item label="Activity name" prop="user">
              <el-input v-model="ruleFormCreateUser.user" />
            </el-form-item>

            <el-form-item label="Password" prop="pass">
              <el-input
                v-model="ruleFormCreateUser.pass"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
              <el-input
                v-model="ruleFormCreateUser.checkPass"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <div class="2xl:flex justify-between items-end">
              <el-form-item label="Group" prop="count">
                <el-select-v2
                  v-model="ruleFormCreateUser.role"
                  placeholder="Activity Group"
                  :options="optionsRole"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitFormCreate(ruleFormCreateUserRef)"
                  >Submit</el-button
                >
                <el-button @click="resetFormCreate(ruleFormCreateUserRef)"
                  >Reset</el-button
                >
              </el-form-item>
            </div>
          </el-form>
        </CardBox>
      </div>
    </SectionMain>
    <!-- ============= dialog update user ==============   -->
    <el-dialog v-model="dialogVisible" title="Edit User" width="30%">
      <el-form
        ref="ruleFormEditUserRef"
        :model="ruleFormEditUser"
        :rules="rulesEdit"
        :label-position="labelPosition"
        status-icon
      >
        <el-form-item label="Activity name" disabled prop="user">
          <el-input v-model="ruleFormEditUser.user" />
        </el-form-item>

        <el-form-item label="Password" prop="pass">
          <el-input
            v-model="ruleFormEditUser.pass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input
            v-model="ruleFormEditUser.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitFormEdit">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </LayoutAuthenticated>
</template>
<!-- <el-form-item label="Old Password" prop="oldPass">
  <el-input
    v-model="ruleFormCreateUser.oldPass"
    type="password"
    autocomplete="off"
  />
</el-form-item> -->
