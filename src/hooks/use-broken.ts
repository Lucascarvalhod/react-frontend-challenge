import { useState } from 'react';

export function useBroken() {
     const [broken, setBroken] = useState(false);
     return { broken, setBroken };
}