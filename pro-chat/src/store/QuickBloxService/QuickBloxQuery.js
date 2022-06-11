import QB from './QuickBlox';
import Cookie from 'js-cookie'

const getUserByLogin = (login) => {
    return new Promise((resolve, reject) => {
        var searchParams = { login: login };
        var currentUser = null
         QB.users.get(searchParams, function(error, user) {
            currentUser = user
            resolve(currentUser);
        });
    })
}

export const createUser = (login, name) => {
    return new Promise((resolve, reject) => {
        var params = {
            login: login,
            password: "yvYJPpZmsu1",
            full_name: name
        };

        QB.users.create(params, function (error, result) {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        });
    })
}

export const userLogin = (login) => {
    return new Promise((resolve, reject) => {
        var params = { login: login, password: "yvYJPpZmsu1" };
        QB.login(params, function (error, result) {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        });
    })
}

export const createUserSession = (login) => {
    return new Promise((resolve, reject) => {
        var params = { login: login, password: "yvYJPpZmsu1" };
        QB.createSession(params, function (error, result) {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        });
    })
}

export const createChatServer = (login) => {
    return new Promise((resolve, reject) => {
            var session = QB.service.getSession();
            var userId = session.user_id;
            var password = session.token;
            var params = {userId, password};
            QB.chat.connect(params, function (error, contactList) {
                if (error) {
                    reject(error)
                } else {
                    resolve(contactList)
                }
            });
    })
}

const createSession = (userId, type) => {
    return new Promise((resolve, reject) => {
        var user = Cookie.get("user") ? JSON.parse(Cookie.get("user")) : {}
        getUserByLogin(user.id).then((QBuser) => {
            var calleesIds = [userId, QBuser.id]; // Users' ids
            var sessionType = type ? QB.webrtc.CallType.VIDEO : QB.webrtc.CallType.AUDIO; // AUDIO is also possible
            var additionalOptions = {};
            try {
                var session = QB.webrtc.createNewSession(calleesIds, sessionType, null, additionalOptions);
                resolve(session)
            } catch (error) {
                reject(error)
            }
        })

    })
}

export const makeCall = (callerID, type) => {
    return new Promise((resolve, reject) => {
        getUserByLogin(callerID).then((QBuser) => {
            setTimeout(function(){
                createSession(QBuser.id, type).then((session) => {
                    var mediaParams = {
                        audio: true,
                        video: type ? true : false,
                        options: {
                            muted: false,
                            mirror: false,
                        },
                    };
                    session.getUserMedia(mediaParams, function (error, stream) {
                        if (error) {
                            console.log(error);
                        } else {
                            var extension = {};
                            session.call(extension, function (error) {
                                resolve(stream)
                            });
                        }
                    });
                })
            },500)

        })
    })
}

export const initQB = () => {
    var user = Cookie.get("user") ? JSON.parse(Cookie.get("user")) : {}
    QB.createSession(function(error, result) {
        return new Promise((resolve, reject) => {
            createUser(user.id, user.name).then((QBuser) => {
                createUserSession(user.id).then((res) => {
                    createChatServer(QBuser.id).then((data) => {
                        console.log(data);
                    })
                })
            }).catch(() => {
                userLogin(user.id).then((QBuser) => {
                    createUserSession(user.id).then((res) => {
                        createChatServer(QBuser.id).then((data) => {
                            console.log(data);
                        })
                    })
                })
            })
        })
    });
}

export const rejectCall = (currentSession) => {
    return new Promise((resolve, reject) => {
        var extension = {};
        currentSession.reject(extension);
    })
}

export const acceptCall = (currentSession) => {
    return new Promise((resolve, reject) => {
        var mediaParams = {
            audio: true,
            video: false,
            options: {
                muted: false,
                mirror: false,
            },
        };
        currentSession.getUserMedia(mediaParams, function (error, stream) {
            if (error) {
                console.log(error);
            } else {
                var extension = {};
                currentSession.accept(extension);
            }
        });

    })
}

export default QB;
