export function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

type OpenGraphType = {
    siteName: string;
    description: string;
    templateTitle?: string;
    logo?: string;
    banner?: string;
    isBlog?: boolean;
};
export function openGraph({
    siteName,
    templateTitle,
    description,
    banner,
    logo = 'https://amri.tech/assets/logo.jpg',
    isBlog = false,
}: OpenGraphType): string {
    const ogLogo = encodeURIComponent(logo);
    const ogSiteName = encodeURIComponent(siteName.trim());
    const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
    const ogDesc = encodeURIComponent(description.trim());

    if (isBlog) {
    const ogBanner = banner ? encodeURIComponent(banner.trim()) : undefined;

    return `https://www.amri.tech/api/blog?siteName=${ogSiteName}&templateTitle=${ogTemplateTitle}&banner=${ogBanner}`;
    }
    
    return `https://www.amri.tech/api/general?siteName=${ogSiteName}&description=${ogDesc}${ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''}`
}

/**
 * Remove `id-` prefix
 */
export const cleanBlogPrefix = (slug: string) => {
    if (slug.slice(0, 3) === 'id-') {
    return slug.slice(3);
    } else {
    return slug;
    }
};

/**
 * Access session storage on browser
 */
export function getFromSessionStorage(key: string) {
    if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
    }
    return null;
}

export function getFromLocalStorage(key: string) {
    if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
    }
    return null;
}

/**
 * Font Loader
 */

export const alexandriaFontLoader = (weight: string) =>
fetch(`https://amri.tech/assets/fonts/Alexandria-${weight}.ttf`.toString()).then((res) => res.arrayBuffer())