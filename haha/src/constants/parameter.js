const host = import.meta.env.VITE_BACKEND_HOST

const token = import.meta.env.VITE_BACKEND_TOKEN

const header = {
    Authorization: token,
}

export { host, header }
