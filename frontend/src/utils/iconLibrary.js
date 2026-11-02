
import {
    // Education and learning
    BookOpen,
    Book,
    GraduationCap,
    School,
    Library,
    Brain,
    Lightbulb,
    Notebook,
    NotebookPen,
    Pencil,
    Pen,
    PenLine,
    Highlighter,
    Clipboard,
    ClipboardCheck,
    FileText,

    // Grammar and language
    Languages,
    SpellCheck,
    ALargeSmall,
    CaseSensitive,
    Text,
    TextCursorInput,
    MessageSquare,
    MessageCircle,
    MessagesSquare,
    Speech,
    Quote,
    Captions,
    AudioLines,
    Mic,
    Headphones,

    // Writing and reading
    FileEdit,
    FilePenLine,
    ScrollText,
    BookMarked,
    Bookmark,
    LibraryBig,
    Newspaper,
    Type,
    List,
    ListChecks,

    // Thinking and creativity
    BrainCircuit,
    Puzzle,
    Lightbulb as Idea,
    Telescope,
    Search,
    Compass,
    Eye,
    ScanSearch,
    WandSparkles,
    Sparkles,

    // Achievement and progress
    Trophy,
    Target,
    Medal,
    Award,
    Star,
    Crown,
    Flag,
    Flame,
    ChartNoAxesColumnIncreasing,
    TrendingUp,

    // General-purpose
    Rocket,
    Zap,
    Heart,
    Clock,
    CalendarDays,
    CheckCircle,
    CircleHelp,
    CircleCheck,
    Layers,
    FolderOpen,
} from "lucide-react";

export const iconLibrary = {
    education: [
        BookOpen, Book, GraduationCap, School,
        Library, Brain, Lightbulb, Notebook,
        NotebookPen, Pencil, Pen, PenLine,
        Highlighter, Clipboard, ClipboardCheck, FileText,
    ],

    language: [
        Languages, SpellCheck, ALargeSmall,
        CaseSensitive, Text, TextCursorInput,
        MessageSquare, MessageCircle, MessagesSquare,
        Speech, Quote, Captions, AudioLines,
        Mic, Headphones,
    ],

    reading: [
        FileEdit, FilePenLine, ScrollText,
        BookMarked, Bookmark, LibraryBig,
        Newspaper, Type, List, ListChecks,
    ],

    creativity: [
        BrainCircuit, Puzzle, Idea, Telescope,
        Search, Compass, Eye, ScanSearch,
        WandSparkles, Sparkles,
    ],

    achievement: [
        Trophy, Target, Medal, Award, Star,
        Crown, Flag, Flame,
        ChartNoAxesColumnIncreasing, TrendingUp,
    ],

    general: [
        Rocket, Zap, Heart, Clock, CalendarDays,
        CheckCircle, CircleHelp, CircleCheck,
        Layers, FolderOpen,
    ],
};

export const getAllIcons = () =>
    Object.values(iconLibrary).flat();

export const getRandomIcons = (count, category = null) => {
    const icons = category
        ? [...(iconLibrary[category] ?? [])]
        : getAllIcons();

    for (let i = icons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [icons[i], icons[j]] = [icons[j], icons[i]];
    }

    return Array.from(
        { length: count },
        (_, index) => icons[index % icons.length]
    );
};
