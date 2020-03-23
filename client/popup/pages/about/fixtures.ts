type Impl = {
    name: string;
    url: string;
}

export const impls: Impl[] = [
    { name: 'gensim', url: 'https://pypi.org/project/gensim/'},
    { name: 'pytldr', url: 'https://github.com/vinodnimbalkar/PyTLDR'},
    { name: 'sumy', url: 'https://github.com/miso-belica/sumy'},
    { name: 'summa', url: 'https://pypi.org/project/summa/'},
    // FIXME: specify?
    { name: 'textrank', url: 'https://github.com/summanlp/textrank'}
]