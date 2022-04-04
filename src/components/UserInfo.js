export default class UserInfo {
    constructor(userName, userInfo) {
        this._name = userName;
        this._job = userInfo;
    }
    getUserInfo() {
        const userData = { name: this._name.textContent, text: this._job.textContent };
        return userData;
    };
    setUserInfo(formData) {
        this._name.textContent = formData.name;
        this._job.textContent = formData.text;
    };
}