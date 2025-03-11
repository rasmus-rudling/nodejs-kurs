
export interface BlogPost {
  id: string
  content: string
  creator: {
    name: string
    email: string
  }
  createdAt: Date
}

export class BlogPostsService {
  async findOne(id: string): Promise<BlogPost> {
    await new Promise(resolve => setTimeout(resolve, 100))

    return {
      id: '9B0E4739-23B3-4095-9014-3F3FF2A1FA10',
      content: 'My first blog post',
      creator: {
        name: 'Rasmus',
        email: 'rasmus@julo.se'
      },
      createdAt: new Date()
    }
  }
}