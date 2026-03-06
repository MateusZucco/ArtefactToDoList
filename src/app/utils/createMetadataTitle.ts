import { Metadata } from 'next'

function createMetadataTitle(metadata: { title: string , description:string}): Metadata {
    return {
        title: metadata.title,
        description: metadata.description
    }
}

export default createMetadataTitle