import {execSync} from "node:child_process";


function getCommitCount() {
    try {
        // Получаем количество коммитов в текущей ветке
        const count = execSync('git rev-list --count HEAD', { encoding: 'utf-8' }).trim()
        return parseInt(count, 10)
    } catch (error) {
        console.error('Ошибка при выполнении команды git:', error)
        return 0
    }
}

export default getCommitCount()