import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    // Comandos antes do testes executarem
    console.log('Setup')

    return {
      // Comandos depois dos testes executarem
      async teardown() {
        console.log('Setup')
      },
    }
  },
}
