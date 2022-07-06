type Face = {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    features: {
        left_eye: {
            x: number,
            y: number
        },
        right_eye: {
            x: number,
            y: number
        },
        nose_tip: {
            x: number,
            y: number
        },
        left_mouth_corner: {
            x: number,
            y: number
        },
        right_mouth_corner: {
            x: number,
            y: number
        }
    },
    attributes: {
        female: number,
        male: number,
        minor: number,
        sunglasses: number
    }
}

export type PrefilterResponseType = {
    status: string,
    request: {
        id: string,
        timestamp: number,
        operations: number
    },
    nudity: { raw: number, safe: number, partial: number },
    weapon: number,
    alcohol: number,
    drugs: number,
    offensive: { prob: number },
    faces: Face[],
    gore: { prob: number },
    media: {
        id: string,
        uri: string
    }
}