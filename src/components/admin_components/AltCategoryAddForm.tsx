import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Label } from "../ui/label";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChangeEvent, Dispatch, JSX, SetStateAction } from "react";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

interface StateProps {
  setIsOpenAdd: Dispatch<SetStateAction<boolean>>; // ✅ burada ad və tipi
}
export default function AltCategoryAddForm({setIsOpenAdd}:StateProps): JSX.Element {
    const editor = useEditor({
        extensions: [StarterKit],
        content: "",
        editorProps: {
            attributes: {
                class:
                    "min-h-[150px] p-3 border rounded-[6px] focus:outline-none border-[#BABABA]",
            },
        },
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        console.log(e.target.files);
    };

    return (
        <form className="bg-[#070618] md:w-[638px] absolute z-50 top-[20%] right-6 md:right-[25%] p-8 rounded-lg">
            <div className="flex flex-col gap-6">

                <div className="flex md:flex-row flex-col md:gap-0 gap-5 justify-between">
                    <div className="flex flex-col  gap-2">
                        <Label className="text-[20px] font-semibold text-white">
                            Mövzu başlığı
                        </Label>
                        <textarea placeholder="Lorem ipsum dolor sit"  className="resize-none p-[10px] text-[16px] font-medium h-[70px] md:w-[274px] border rounded-[6px] border-[#BABABA]"
                        />
                        {/* <Input
                            placeholder="Lorem ipsum dolor sit"
                            className="p-[10px] text-[16px] font-medium h-[70px] md:w-[274px] border rounded-[6px] border-[#BABABA]"
                        /> */}
                    </div>


                    <div className="flex flex-col gap-2">
                        <Label className="text-[20px] font-semibold text-white">
                            Dataset faylı
                        </Label>

                        <Button
                            component="label"
                            variant="contained"
                            className="h-[40px] md:h-[70px] md:w-[228px] rounded-[10px]"
                            style={{
                                borderRadius: "10px"
                            }}
                            startIcon={<CloudUploadIcon />}
                        >
                            Fayl yüklə
                            <VisuallyHiddenInput
                                type="file"
                                multiple
                                onChange={handleFileChange}
                            />
                        </Button>
                    </div>
                </div>


                {/* TEXT EDITOR */}
                <div className="flex flex-col gap-2">
                    {editor && (
                        <div className=" rounded-[6px] flex flex-col  overflow-hidden">
                            <Toolbar editor={editor} />
                            <EditorContent className="" editor={editor} />
                        </div>
                    )}
                </div>
                <div className="flex justify-end">
                    <div className="flex items-center gap-[15px] text-[16px] font-semibold">
                        <p onClick={()=>setIsOpenAdd(false)} className="cursor-pointer">Ləğv et</p>

                        <Button style={{
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: 600,
                            textTransform: "none"
                        }}
                            type="submit"
                            className="bg-[#3460DC] hover:bg-blue-700 duration-300 cursor-pointer rounded-[10px] p-2 h-[46px] w-[125px]"
                            variant="contained"
                        >Təsdiqlə
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

interface ToolbarProps {
    editor: Editor;
}

function Toolbar({ editor }: ToolbarProps): JSX.Element {
    return (
        <div className="flex gap-2 p-2 border border-b-0 rounded-[6px] border-[#BABABAv]">
            <ToolbarButton
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                B
            </ToolbarButton>

            <ToolbarButton
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                I
            </ToolbarButton>

            <ToolbarButton
                active={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                •
            </ToolbarButton>
        </div>
    );
}

interface ToolbarButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

function ToolbarButton({
    active,
    onClick,
    children,
}: ToolbarButtonProps): JSX.Element {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-3 py-1 rounded text-sm transition ${active
                ? "bg-blue-500 "
                : "bg-white hover:bg-gray-200"
                } text-[#070618]`}
        >
            {children}
        </button>
    );
}
