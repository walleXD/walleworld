declare type WiredButton = import('wired-elements').WiredButton
declare type WiredCard = import('wired-elements').WiredCard

declare module JSX {
    interface IntrinsicElements {
      "wired-button": React.DetailedHTMLProps<React.HTMLAttributes<WiredButton>, WiredButton> 
      "wired-card": React.DetailedHTMLProps<React.HTMLAttributes<WiredCard>, WiredCard> 
    }
}

declare const graphql: (query: TemplateStringsArray) => void
declare const __PATH_PREFIX__: string;

