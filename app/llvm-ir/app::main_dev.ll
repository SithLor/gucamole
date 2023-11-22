define internal void @app::main() unnamed_addr #1 {
start:
%_2 = alloca %"core::fmt::Arguments<'_>"
call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_2)
store ptr @alloc_004b71e11835e37789f0750656a25291, ptr %_2, align 8
%0 = getelementptr inbounds { ptr, i64 }, ptr %_2, i64 0, i32 1
store i64 1, ptr %0, align 8
%1 = getelementptr inbounds %"core::fmt::Arguments<'_>"
store ptr null, ptr %1, align 8
%2 = getelementptr inbounds %"core::fmt::Arguments<'_>"
store ptr @alloc_513570631223a12912d85da2bec3b15a, ptr %2, align 8
%3 = getelementptr inbounds %"core::fmt::Arguments<'_>"
store i64 0, ptr %3, align 8
; call std::io::stdio::_print
call void @_ZN3std2io5stdio6_print17hd122dd52328ca9d4E(ptr noalias nocapture noundef nonnull align 8 dereferenceable(48) %_2)
call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_2)
ret void
}
