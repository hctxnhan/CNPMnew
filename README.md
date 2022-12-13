## Software Engineering Project 
[![My Skills](https://skillicons.dev/icons?i=react,nodejs,ts,vite,firebase&perline=5)](https://skillicons.dev)

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/hctxnhan/CNPMnew) 

![GitHub contributors](https://img.shields.io/github/contributors/hctxnhan/CNPMnew) 

![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/hctxnhan/CNPMnew) 

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hctxnhan/CNPMnew)

## Overview
* Technical:

        Backend: NodeJs
        Frontend and Database: Firebase

* Library: ReactJS adnd Vite 
* Integrated development environment (IDE) : VSCode
* Contributors

        1. Hoàng Công Thành Nhân    20110687
        2. Lê Phạm Bảo Lộc          20110672
        3. Trần Chí Mỹ              20110202

## Project Structure

```base
CNPMNew/
├─ firebase-export/
│  ├─ auth_export/
│  │  ├─ accounts.json
│  │  ├─ config.json
│  ├─ firestore_export/
│  │  ├─ firestore_export.overall_export_metadata
│  ├─ firebase-export-metadata.json
├─ src/
│  ├─ assets/
│  │  ├─ logo.png
│  │  ├─ react.svg
│  ├─ components/
│  │  ├─ AccountList.tsx
│  │  ├─ AppliedStudent.tsx
│  │  ├─ AppliedStudentList.tsx
│  │  ├─ BookmarkButton.tsx
│  │  ├─ Button.tsx
│  │  ├─ CenterScreen.tsx
│  │  ├─ CheckVisible.tsx
│  │  ├─ ConfirmationPopup.tsx
│  │  ├─ CreateAccount.tsx
│  │  ├─ CreatePeriod.tsx
│  │  ├─ CreateTopic.tsx
│  │  ├─ EmptyTopicList.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Input.tsx
│  │  ├─ InputTag.tsx
│  │  ├─ LoginPopup.tsx
│  │  ├─ NavbarLink.tsx
│  │  ├─ NewTabs.tsx
│  │  ├─ NormalModal.tsx
│  │  ├─ Notification.tsx
│  │  ├─ NotificationList.tsx
│  │  ├─ Portal.tsx
│  │  ├─ Search.tsx
│  │  ├─ SelectEvaluationMember.tsx
│  │  ├─ SelectInput.tsx
│  │  ├─ ShowNotification.tsx
│  │  ├─ TabPane.tsx
│  │  ├─ Tabs.tsx
│  │  ├─ TagInputComponent.tsx
│  │  ├─ TeacherEvaluationItem.tsx
│  │  ├─ TeacherList.tsx
│  │  ├─ TopicComponent.tsx
│  │  ├─ TopicDetail.tsx
│  │  ├─ TopicList.tsx
│  │  ├─ UserComponent.tsx
│  │  ├─ WithOverlay.tsx
│  │  ├─ navbar.tsx
│  ├─ firebase/
│  │  ├─ auth.tsx
│  │  ├─ firebase.tsx
│  │  ├─ firestore.tsx
│  │  ├─ periodMock.tsx
│  │  ├─ userMock.tsx
│  ├─ hooks/
│  │  ├─ useCheckActiveTopic.tsx
│  │  ├─ useCheckLogin.tsx
│  │  ├─ useCheckLoginRole.tsx
│  │  ├─ useConfirmPopup.tsx
│  │  ├─ useNotification.tsx
│  │  ├─ useTagInput.tsx
│  │  ├─ useUserRole.tsx
│  ├─ pages/
│  │  ├─ AccountManagement.tsx
│  │  ├─ BookmarkedTopics.tsx
│  │  ├─ CreatedTopics.tsx
│  │  ├─ FindTopics.tsx
│  │  ├─ NoAuthenticated.tsx
│  │  ├─ SpecializationTopics.tsx
│  ├─ redux/
│  │  ├─ features/
│  │  │  ├─ educatorSlice.tsx
│  │  │  ├─ notificationSlice.ts
│  │  │  ├─ topicDetailSlice.tsx
│  │  │  ├─ topicSlice.tsx
│  │  │  ├─ userSlice.tsx
│  │  ├─ store.tsx
│  ├─ utils/
│  │  ├─ functions/
│  │  │  ├─ CheckIfPeriodACtive.tsx
│  │  │  ├─ notificationUtil.ts
│  │  ├─ types/
│  │  │  ├─ Notification.ts
│  │  │  ├─ RegistrationPeriod.tsx
│  │  │  ├─ SelectOptionType.tsx
│  │  │  ├─ Specialization.tsx
│  │  │  ├─ Tabs.tsx
│  │  │  ├─ Topic.tsx
│  │  │  ├─ User.tsx
│  │  │  ├─ UserRole.tsx
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
```
## How To Run

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/hctxnhan/CNPMnew.git

# Go into the repository
$ cd CNPMnew

# Install dependencies
$ npm install

# Run the app Frontend
$ npm start dev

# Open new terminal Run Backend firebase
$ npm run firebase

```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.
