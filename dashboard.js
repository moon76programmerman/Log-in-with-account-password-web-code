// 取得目前登入的使用者名稱（可從登入時存入 localStorage 的值）
const currentUser = localStorage.getItem('currentUser');

document.getElementById('deleteAccount').addEventListener('click', function () {
    if (confirm(`Are you sure you want to delete the account "${currentUser}"?`)) {
        localStorage.removeItem(currentUser);  // 刪除帳號資料
        localStorage.removeItem('currentUser');  // 移除目前使用者的紀錄
        alert('Account deleted successfully.');
        window.location.href = 'index.html';  // 回到登入頁面
    }
});