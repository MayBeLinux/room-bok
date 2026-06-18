<script setup lang="ts">
import { addDays, isYesterday } from 'date-fns'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const value = ref(addDays(Date.now(), 1).valueOf())

function handleUpdateValue(
    _: number,
    { year, month, date }: { year: number, month: number, date: number }
) {
    message.success(`${year}-${month}-${date}`)
}

function isDateDisabled(timestamp: number) {
    if (isYesterday(timestamp)) {
    return true
    }
    return false
}



</script>
